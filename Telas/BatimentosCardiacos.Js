import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function HeartRateMonitor() {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [bpm, setBpm] = useState(60);

  useEffect(() => {
    // Animação do coração batendo
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 250, // mais rápido para combinar com BPM
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    return () => pulse.stop();
  }, []);

  useEffect(() => {
    // Atualiza o BPM a cada 500ms com número aleatório entre 58 e 75
    const interval = setInterval(() => {
      const newBpm = Math.floor(Math.random() * (75 - 58 + 1)) + 58;
      setBpm(newBpm);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.pageContainer}>
      <View style={styles.card}>
        <Text style={styles.title}>BATIMENTOS CARDIACOS</Text>
        <View style={styles.content}>
          <Animated.View style={[styles.heartContainer, { transform: [{ scale: scaleAnim }] }]}>
            <FontAwesome name="heart" size={60} color="red" />
          </Animated.View>
          <Text style={styles.bpmText}>{bpm}bpm</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#c9f0e4',
    paddingVertical: 25,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#114d44',
    marginBottom: 15,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  heartContainer: {
    marginRight: 20,
  },
  bpmText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#114d44',
  },
});
