import React, { useState, createContext, useContext } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, SafeAreaView, ScrollView, Switch } from "react-native";
import styles from "./style";
import { useTheme } from "./ThemeContext";

export default function Interface({ navigation }) {
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Imagens que mudam com o tema
  const ondas = theme === "light" ? require("../assets/ondasA.png") : require("../assets/ondasB.png");
  const perfil = theme === "light" ? require("../assets/perfilA.png") : require("../assets/perfilB.png");

  return (
    <SafeAreaView style={[styles.container, theme === "dark" && styles.darkContainer]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Fundo com ondas */}
        <Image source={ondas} style={styles.ondas} />



        {/* Foto/ícone de perfil */}
        <Image source={perfil} style={styles.perfil} />

        {/* Nome do Responsável */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, theme === "dark" && styles.darkText]}>Nome do Responsável</Text>
          <TextInput style={[styles.input, theme === "dark" && styles.darkInput]} value="Fulano" />
        </View>

        {/* Nome do Usuário da Pulseira */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, theme === "dark" && styles.darkText]}>Nome do Usuário da Pulseira</Text>
          <TextInput style={[styles.input, theme === "dark" && styles.darkInput]} value="Fulano" />
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, theme === "dark" && styles.darkText]}>Email</Text>
          <TextInput style={[styles.input, theme === "dark" && styles.darkInput]} value="Fulano@gmail.com" />
        </View>

        {/* Senha */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, theme === "dark" && styles.darkText]}>Senha</Text>
          <View style={styles.senhaContainer}>
            <TextInput
              style={[styles.senhaInput, theme === "dark" && styles.darkInput]}
              secureTextEntry={!senhaVisivel}
              value="********"
            />
            <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)}>
              <Text style={styles.toggleSenha}>{senhaVisivel ? "🙈" : "👁️"}</Text>
            </TouchableOpacity>
          </View>
        </View>

      {/* Switch claro e escuro*/}
      <View style={[styles.container, theme === "dark" && styles.darkContainer]}>
      <Text style={[styles.label, theme === "dark" && styles.darkText]}>
        Modo {theme === "light" ? "Claro" : "Escuro"}
           
      <Switch
        value={theme === "dark"}
        onValueChange={toggleTheme}
      />
      </Text>
    </View>

        {/* Rodapé */}
        <Text style={[styles.footer, theme === "dark" && styles.darkText]}>
          Desenvolvido por A.P.T.A. {"\n"}a tecnologia que cuida de você
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
