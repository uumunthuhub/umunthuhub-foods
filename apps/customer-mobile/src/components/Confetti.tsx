import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';

const { width: W, height: H } = Dimensions.get('window');

const COLORS = ['#f97316', '#ff6b35', '#fbbf24', '#34d399', '#60a5fa', '#e879f9', '#f43f5e', '#fff'];
const COUNT = 60;

interface Particle {
  x: Animated.Value;
  y: Animated.Value;
  rotate: Animated.Value;
  opacity: Animated.Value;
  color: string;
  size: number;
  isRect: boolean;
}

function makeParticle(i: number): Particle {
  return {
    x: new Animated.Value(W * 0.3 + Math.random() * W * 0.4),
    y: new Animated.Value(-20),
    rotate: new Animated.Value(0),
    opacity: new Animated.Value(1),
    color: COLORS[i % COLORS.length],
    size: 6 + Math.random() * 6,
    isRect: Math.random() > 0.5,
  };
}

interface ConfettiProps {
  running: boolean;
  onDone?: () => void;
}

export function Confetti({ running, onDone }: ConfettiProps) {
  const particles = useRef<Particle[]>(
    Array.from({ length: COUNT }, (_, i) => makeParticle(i))
  ).current;

  const started = useRef(false);

  useEffect(() => {
    if (!running || started.current) return;
    started.current = true;

    const anims = particles.map((p, i) => {
      const delay = Math.random() * 400;
      const duration = 1400 + Math.random() * 800;
      const targetX = p.x._value + (Math.random() - 0.5) * 200;
      const targetY = H * 0.65 + Math.random() * H * 0.2;

      return Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(p.x, { toValue: targetX, duration, useNativeDriver: true }),
          Animated.timing(p.y, { toValue: targetY, duration, useNativeDriver: true }),
          Animated.timing(p.rotate, { toValue: 720 + Math.random() * 360, duration, useNativeDriver: true }),
          Animated.sequence([
            Animated.timing(p.opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
            Animated.delay(duration - 400),
            Animated.timing(p.opacity, { toValue: 0, duration: 400, useNativeDriver: true }),
          ]),
        ]),
      ]);
    });

    Animated.parallel(anims).start(() => {
      started.current = false;
      onDone?.();
    });
  }, [running]);

  if (!running) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {particles.map((p, i) => {
        const rotate = p.rotate.interpolate({
          inputRange: [0, 360],
          outputRange: ['0deg', '360deg'],
        });
        return (
          <Animated.View
            key={i}
            style={{
              position: 'absolute',
              width: p.size,
              height: p.isRect ? p.size * 0.5 : p.size,
              borderRadius: p.isRect ? 2 : p.size / 2,
              backgroundColor: p.color,
              opacity: p.opacity,
              transform: [
                { translateX: p.x },
                { translateY: p.y },
                { rotate },
              ],
            }}
          />
        );
      })}
    </View>
  );
}
