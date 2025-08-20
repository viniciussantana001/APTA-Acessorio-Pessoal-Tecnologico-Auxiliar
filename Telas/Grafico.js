import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from "react-native";
import { PieChart, BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function App() {
  // Contadores diários
  const [counts, setCounts] = useState({
    fome: 0,
    sede: 0,
    sono: 0,
    dor: 0,
    socorro: 0,
  });

  // Histórico semanal
  const [historicoSemanal, setHistoricoSemanal] = useState([
    { dia: "Seg", total: 0 },
    { dia: "Ter", total: 0 },
    { dia: "Qua", total: 0 },
    { dia: "Qui", total: 0 },
    { dia: "Sex", total: 0 },
    { dia: "Sáb", total: 0 },
    { dia: "Dom", total: 0 },
  ]);

  const [mostrarHistorico, setMostrarHistorico] = useState(false);
  const [mostrarCausas, setMostrarCausas] = useState(false);

  const handlePress = (tipo) => {
    setCounts((prev) => {
      const atualizado = { ...prev, [tipo]: prev[tipo] + 1 };
      atualizarHistorico(atualizado);
      return atualizado;
    });
  };

  const atualizarHistorico = (countsAtualizados) => {
    const hoje = new Date();
    const diaSemana = hoje.getDay(); // 0=Dom
    setHistoricoSemanal((prev) => {
      const novoHistorico = [...prev];
      novoHistorico[diaSemana] = {
        ...novoHistorico[diaSemana],
        total:
          countsAtualizados.fome +
          countsAtualizados.sede +
          countsAtualizados.sono +
          countsAtualizados.dor +
          countsAtualizados.socorro,
      };
      return novoHistorico;
    });
  };

  // Reset diário à meia-noite
  useEffect(() => {
    const intervalo = setInterval(() => {
      const agora = new Date();
      if (agora.getHours() === 0 && agora.getMinutes() === 0) {
        setCounts({ fome: 0, sede: 0, sono: 0, dor: 0, socorro: 0 });
      }
    }, 60000);
    return () => clearInterval(intervalo);
  }, []);

  // Dados para gráficos
  const chartData = [
    { name: "Fome", population: counts.fome, color: "#FF6B6B" },
    { name: "Sede", population: counts.sede, color: "#4D96FF" },
    { name: "Sono", population: counts.sono, color: "#FFD93D" },
    { name: "Dor", population: counts.dor, color: "#6A4C93" },
    { name: "Socorro", population: counts.socorro, color: "#00C49A" },
  ];

  const barData = {
    labels: historicoSemanal.map((d) => d.dia),
    datasets: [{ data: historicoSemanal.map((d) => d.total) }],
  };

  const diaMaisAlertas = historicoSemanal.reduce(
    (max, dia) => (dia.total > max.total ? dia : max),
    { dia: "", total: 0 }
  );

  const alertaMaisUsadoHoje = Object.entries(counts).reduce(
    (max, [tipo, valor]) => (valor > max.valor ? { tipo, valor } : max),
    { tipo: "", valor: 0 }
  );

  // Causas múltiplas
  const causasPossiveis = {
    fome: [
      "Pular uma refeição.",
      "Gasto energético alto no dia.",
      "Hábito de se alimentar em horários fixos.",
    ],
    sede: ["Pouca ingestão de água.", "Exercício físico intenso.", "Ambiente muito quente/seco."],
    sono: ["Cansaço acumulado.", "Falta de descanso adequado.", "Horário irregular de sono."],
    dor: ["Desconforto físico.", "Lesão ou esforço excessivo.", "Postura inadequada."],
    socorro: ["Situação de emergência.", "Necessidade urgente de ajuda.", "Acidente ou mal-estar súbito."],
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Monitor de Necessidades</Text>

      {/* Gráfico de Pizza + frase abaixo */}
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <PieChart
          data={chartData}
          width={screenWidth - 20}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          hasLegend={true}
          absolute
        />

        {alertaMaisUsadoHoje.valor > 0 ? (
          <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", marginTop: 10 }}>
            Hoje você sentiu{" "}
            <Text
              style={{
                color: chartData.find(
                  (c) => c.name.toLowerCase() === alertaMaisUsadoHoje.tipo
                ).color,
              }}
            >
              {alertaMaisUsadoHoje.tipo.charAt(0).toUpperCase() +
                alertaMaisUsadoHoje.tipo.slice(1)}
            </Text>
          </Text>
        ) : (
          <Text style={{ fontSize: 16, fontStyle: "italic", textAlign: "center", marginTop: 10 }}>
            Nenhum alerta registrado hoje
          </Text>
        )}
      </View>

      {/* Botões de interação */}
      <View style={styles.buttonsContainer}>
        {Object.keys(counts).map((tipo) => (
          <TouchableOpacity
            key={tipo}
            style={[
              styles.button,
              { backgroundColor: chartData.find((c) => c.name.toLowerCase() === tipo).color },
            ]}
            onPress={() => handlePress(tipo)}
          >
            <Text style={styles.buttonText}>
              {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botão causas */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#333", marginTop: 20 }]}
        onPress={() => setMostrarCausas(!mostrarCausas)}
      >
        <Text style={styles.buttonText}>Causas</Text>
      </TouchableOpacity>

      {mostrarCausas && (
        <View style={{ marginTop: 10 }}>
          {alertaMaisUsadoHoje.valor > 0 ? (
            <>
              <Text style={styles.subtitle}>
                Possíveis causas para {alertaMaisUsadoHoje.tipo}:
              </Text>
              {causasPossiveis[alertaMaisUsadoHoje.tipo].map((causa, index) => (
                <View key={index} style={styles.causaCard}>
                  <Text style={styles.causaTextoCard}>{causa}</Text>
                </View>
              ))}
            </>
          ) : (
            <Text style={styles.causasTexto}>Nenhum alerta registrado hoje.</Text>
          )}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#333", marginTop: 10 }]}
            onPress={() => setMostrarCausas(false)}
          >
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Botão histórico */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#555", marginTop: 20 }]}
        onPress={() => setMostrarHistorico(!mostrarHistorico)}
      >
        <Text style={styles.buttonText}>Histórico</Text>
      </TouchableOpacity>

      {mostrarHistorico && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.subtitle}>Histórico da Semana</Text>
          <BarChart
            data={barData}
            width={screenWidth - 20}
            height={220}
            yAxisLabel=""
            chartConfig={chartConfig}
            verticalLabelRotation={0}
          />
          <Text style={styles.alertaTexto}>
            Dia com mais alertas:{" "}
            {diaMaisAlertas.total > 0
              ? `${diaMaisAlertas.dia} (${diaMaisAlertas.total} alertas)`
              : "Nenhum alerta ainda"}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const chartConfig = {
  backgroundColor: "#B2F2BB",
  backgroundGradientFrom: "#B2F2BB",
  backgroundGradientTo: "#B2F2BB",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  subtitle: { fontSize: 18, fontWeight: "bold", marginTop: 10, textAlign: "center" },
  buttonsContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  button: {
    padding: 12,
    borderRadius: 8,
    margin: 5,
    minWidth: 100,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  causasTexto: { fontSize: 16, marginTop: 5, textAlign: "center", fontStyle: "italic" },
  alertaTexto: { fontSize: 16, marginTop: 10, textAlign: "center", fontStyle: "italic" },
  causaCard: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  causaTextoCard: { fontSize: 16, color: "#333" },
});
