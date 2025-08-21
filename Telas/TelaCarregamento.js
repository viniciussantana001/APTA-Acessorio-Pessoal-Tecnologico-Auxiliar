import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from "react-native-reanimated";
import { useEffect } from "react";

export default function Intro() {
  // valor compartilhado para animar o eixo Y
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withTiming(-6, { duration: 1000 }), // sobe 6px em 3s
      -1, // infinito
      true // vai e volta
    );
  }, );

  const animatedLogoStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Onda de cima */}
      <Animated.Image
        entering={FadeInDown.duration(1000)}
        source={require("./assets/ondas.png")}
        style={styles.waveTop}
        resizeMode="contain"
      />

      {/* Conteúdo central */}
      <View style={styles.centerContent}>
        <Animated.Text
          entering={FadeInUp.duration(1000).delay(200)}
          style={styles.welcome}
        >
          BEM -VINDO À
        </Animated.Text>

        <Animated.Text
          entering={FadeInUp.duration(1000).delay(400)}
          style={styles.apta}
        >
          A.P.T.A.
        </Animated.Text>

        {/* Logo com efeito flutuante */}
        <Animated.Image
          entering={FadeInUp.duration(1000).delay(500)}
          source={require("./assets/logo.png")}
          style={[styles.logo, animatedLogoStyle]}
          resizeMode="contain"
        />
      </View>

      {/* Onda de baixo */}
      <Animated.Image
        entering={FadeInDown.duration('400').delay(800)}
        source={require("./assets/ondas.png")}
        style={styles.waveBottom}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
  },
  waveTop: {
    width: "100%",
    height: 120,
    position: "absolute",
    top: 0,
  },
  waveBottom: {
    width: "100%",
    height: 120,
    position: "absolute",
    bottom: 0,
    transform: [{ rotate: "180deg" }],
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcome: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 5,
  },
  apta: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
});
