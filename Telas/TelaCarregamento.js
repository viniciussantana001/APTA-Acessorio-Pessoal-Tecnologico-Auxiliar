import { View, Text, SafeAreaView, StyleSheet, Dimensions } from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from "react-native-reanimated";
import { useEffect } from "react";

const { width, height } = Dimensions.get("window");

export default function Intro() {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withTiming(-10, { duration: 1000 }), // sobe 6px em 3s
      -1, // infinito
      true // vai e volta
    );
  }, []);

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
        resizeMode="cover"
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
          entering={FadeInUp.duration(1000).delay(600)}
          source={require("./assets/logo.png")}
          style={[styles.logo, animatedLogoStyle]}
          resizeMode="contain"
        />
      </View>

      {/* Onda de baixo (sem inversão) */}
      <Animated.Image
        entering={FadeInDown.duration(1000).delay(800)}
        source={require("./assets/ondasbaixo.png")}
        style={styles.waveBottom}
        resizeMode="cover"
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
    width: width,
    height: height * 0.18,
    position: "absolute",
    top: 0,
  },
  waveBottom: {
    width: width,
    height: height * 0.18,
    position: "absolute",
    bottom: 0,
    // sem transform, fica do jeito certo
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcome: {
    fontSize: width * 0.07,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 10,
  },
  apta: {
    fontSize: width * 0.065,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 25,
  },
  logo: {
    width: width * 0.35,
    height: width * 0.35,
  },
});
