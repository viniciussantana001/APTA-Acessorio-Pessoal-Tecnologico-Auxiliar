import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";

export default function TelaUsuario() {
  const [nome, setNome] = useState("");

  const handleContinue = () => {
    if (nome.trim() === "") {
      Alert.alert("Atenção", "Por favor, digite o nome do utilizador.");
    } else {
      Alert.alert("Sucesso", `Bem-vindo(a), ${nome}!`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Texto principal */}
      <Text style={styles.title}>
        COMO DEVEMOS CHAMAR O UTILIZADOR(A) DESTA PULSEIRA?
      </Text>

      {/* Label */}
      <Text style={styles.label}>NOME DO UTILIZADOR:</Text>

      {/* Campo de texto */}
      <TextInput
        style={styles.input}
        placeholder="Digite o nome"
        placeholderTextColor="#999"
        value={nome}
        onChangeText={setNome}
      />

      {/* Botão verde */}
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>CONTINUAR</Text>
      </TouchableOpacity>

      {/* Detalhe extra no canto inferior esquerdo */}
      <Image
        source={require("./assets/detalhe.png")} // detalhe que você vai adicionar
        style={styles.detail}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d4ece7", // cor do fundo
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#134D3A",
    textAlign: "center",
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#134D3A",
    marginBottom: 10,
  },
  input: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#134D3A",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 60,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  detail: {
    position: "absolute",
    bottom: -80, // mais para baixo
    left: 0,
    width: 300,
    height: 300,
  },
});
