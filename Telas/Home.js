  import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  TextInput,
  Button,
  Platform,
} from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Configuração padrão
const defaultBotoes = [
  { texto: "AJUDA", cor: "#d32f2f", msg: "Preciso de Ajuda" },
  { texto: "DOR", cor: "#f44336", msg: "Estou com Dor" },
  { texto: "FOME", cor: "#ff9800", msg: "Estou com Fome" },
  { texto: "SEDE", cor: "#4caf50", msg: "Estou com Sede" },
  { texto: "SONO", cor: "#1976d2", msg: "Estou com Sono" },
];

export default function App() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [botoes, setBotoes] = useState(defaultBotoes);

  const [editModal, setEditModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [tempTexto, setTempTexto] = useState("");
  const [tempMsg, setTempMsg] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permissão para notificações negada!");
      }
    })();

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.HIGH,
        sound: "default",
      });
    }
  }, []);

  const enviarNotificacao = async (titulo, corpo) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: titulo,
        body: corpo,
        sound: true,
      },
      trigger: null,
    });
  };

  const handlePress = (texto, msg) => {
    setNotificacoes((prev) => [msg, ...prev]);
    enviarNotificacao(`Botão ${texto}`, msg);
  };

  const abrirEdicao = (index) => {
    const btn = botoes[index];
    setCurrentIndex(index);
    setTempTexto(btn.texto);
    setTempMsg(btn.msg);
    setEditModal(true);
  };

  const salvarEdicao = () => {
    const novosBotoes = [...botoes];
    novosBotoes[currentIndex] = {
      ...novosBotoes[currentIndex],
      texto: tempTexto,
      msg: tempMsg,
    };
    setBotoes(novosBotoes);
    setEditModal(false);
  };

  const restaurarDefault = () => {
    setBotoes(defaultBotoes);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>SEUS BOTÕES</Text>
      <View style={styles.header}>
        <Text style={styles.subtitulo}>Botões</Text>
        <Text style={styles.subtitulo}>Mensagem</Text>
      </View>

      {botoes.map((btn, i) => (
        <View key={i} style={styles.row}>
          <TouchableOpacity
            style={[styles.botao, { backgroundColor: btn.cor }]}
            onPress={() => handlePress(btn.texto, btn.msg)}
            onLongPress={() => abrirEdicao(i)}
          >
            <Text style={styles.textoBotao}>{btn.texto}</Text>
          </TouchableOpacity>
          <View style={styles.mensagemBox}>
            <Text style={styles.textoMensagem}>{btn.msg}</Text>
          </View>
        </View>
      ))}

      {/* Botão de Reset */}
      <TouchableOpacity style={styles.resetButton} onPress={restaurarDefault}>
        <Text style={styles.resetText}>Restaurar Botões Padrão</Text>
      </TouchableOpacity>

      <Text style={styles.notificacaoTitulo}>Notificações:</Text>
      <ScrollView style={styles.notificacaoBox}>
        {notificacoes.map((n, index) => (
          <Text key={index} style={styles.notificacaoItem}>
            {n}
          </Text>
        ))}
      </ScrollView>

      {/* Modal de edição */}
      <Modal visible={editModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
              Editar Botão
            </Text>

            <TextInput
              value={tempTexto}
              onChangeText={setTempTexto}
              style={styles.input}
              placeholder="Texto do botão"
            />

            <TextInput
              value={tempMsg}
              onChangeText={setTempMsg}
              style={styles.input}
              placeholder="Mensagem do botão"
            />

            <Button title="Salvar" onPress={salvarEdicao} />
            <Button
              title="Cancelar"
              color="gray"
              onPress={() => setEditModal(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8fefc" },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#1b4332",
  },
  header: { flexDirection: "row", marginBottom: 10 },
  subtitulo: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#1b4332",
    textAlign: "center",
  },
  row: { flexDirection: "row", marginBottom: 15 },
  botao: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  textoBotao: { color: "#fff", fontWeight: "bold", fontSize: 18, textAlign: "center" },
  mensagemBox: {
    flex: 1,
    backgroundColor: "#5c8d89",
    padding: 20,
    borderRadius: 10,
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  textoMensagem: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  resetButton: {
    backgroundColor: "#2e7d32",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  resetText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  notificacaoTitulo: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#1b4332",
  },
  notificacaoBox: {
    marginTop: 10,
    backgroundColor: "#e8f5e9",
    borderRadius: 10,
    padding: 10,
    maxHeight: 200,
  },
  notificacaoItem: {
    fontSize: 16,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  rodape: { marginTop: 20, fontSize: 12, textAlign: "center", color: "#666" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    width: "100%",
    borderRadius: 5,
    marginBottom: 10,
  },
});
