import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { useAppStore } from "../store/useAppStore";
import { Play } from "lucide-react-native";
import { useFocusEffect } from "expo-router";

interface HeroVideo {
  video: string;
  name: string;
  restaurant: string;
  price: number;
}

interface VideoCarouselProps {
  videos: HeroVideo[];
  onQuickAdd?: (item: HeroVideo) => void;
}

const CYCLE_MS = 9000; // how long each video stays before switching
const FADE_MS = 900; // how long the crossfade itself takes

export const VideoCarousel: React.FC<VideoCarouselProps> = ({
  videos,
  onQuickAdd,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFocused, setIsFocused] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);
      return () => setIsFocused(false);
    }, []),
  );

  const opacity = useRef(new Animated.Value(1)).current;
  const autoCycleRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const addToCart = useAppStore((s) => s.addToCart);

  const currentVideo = videos[currentIndex];

  const videoSource = React.useMemo(
    () => ({ uri: currentVideo.video }),
    [currentVideo.video],
  );

  const player = useVideoPlayer(videoSource, (p) => {
    p.loop = true;
    if (isFocused) p.play();
  });

  // Swap source when index changes
  useEffect(() => {
    player.replace(videoSource);

    // Give native view time to mount new source before fading up
    const t = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: FADE_MS,
        useNativeDriver: true,
      }).start();
    }, 150);

    return () => clearTimeout(t);
  }, [videoSource]);

  // Handle focus and manual play/pause changes
  useEffect(() => {
    if (isPlaying && isFocused) {
      player.play();
    } else {
      player.pause();
    }
  }, [isPlaying, isFocused, player]);

  // Auto-cycle with crossfade matching web: 9000ms hold, 900ms fade
  useEffect(() => {
    if (!isPlaying || !isFocused) return;

    autoCycleRef.current = setInterval(() => {
      // fade out
      Animated.timing(opacity, {
        toValue: 0,
        duration: FADE_MS,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          // swap (this triggers the useEffect above to fade in)
          setCurrentIndex((prev) => (prev + 1) % videos.length);
        }
      });
    }, CYCLE_MS);

    return () => {
      if (autoCycleRef.current) clearInterval(autoCycleRef.current);
      opacity.stopAnimation();
      opacity.setValue(1);
    };
  }, [videos.length, isPlaying, isFocused, opacity]);

  const togglePlayback = useCallback(() => {
    if (player.playing) {
      player.pause();
      setIsPlaying(false);
    } else {
      player.play();
      setIsPlaying(true);
    }
  }, [player]);

  const handleQuickAdd = useCallback(() => {
    addToCart({
      menuItemId: currentVideo.name,
      name: currentVideo.name,
      price: currentVideo.price,
      quantity: 1,
    });
    if (onQuickAdd) onQuickAdd(currentVideo);
  }, [currentVideo, addToCart, onQuickAdd]);

  return (
    <View style={styles.container}>
      {/* Video + Overlay */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={togglePlayback}
        style={styles.videoWrapper}
      >
        <Animated.View style={[StyleSheet.absoluteFill, { opacity }]}>
          <VideoView
            style={StyleSheet.absoluteFill}
            player={player}
            allowsPictureInPicture={false}
            contentFit="cover"
            nativeControls={false}
          />
        </Animated.View>

        {/* Dark gradient overlay */}
        <View style={styles.gradient} pointerEvents="none" />

        {/* Trending badge */}
        <View style={styles.trendingBadge}>
          <Text style={styles.trendingText}>🔥 TRENDING</Text>
        </View>

        {/* Play/Pause */}
        {!isPlaying && (
          <View style={styles.playBtn} pointerEvents="none">
            <Play
              fill="#fff"
              color="#fff"
              size={24}
              style={{ marginLeft: 4 }}
            />
          </View>
        )}

        {/* Overlay info + CTA — sits above the gradient at bottom of video */}
        <View style={styles.overlayInfo}>
          <View style={styles.overlayInfoInner}>
            <View style={{ flex: 1 }}>
              <Text style={styles.overlayName} numberOfLines={1}>
                {currentVideo.name}
              </Text>
              <Text style={styles.overlayRestaurant}>
                {currentVideo.restaurant}
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleQuickAdd}
              style={styles.quickAddBtn}
            >
              <Text style={styles.quickAddText}>+ Quick Add</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.overlayPrice}>
            ${currentVideo.price.toFixed(2)}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  videoWrapper: {
    height: 220,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#1a1a1a",
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
  },
  trendingBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.65)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 99,
  },
  trendingText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  playBtn: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -24,
    marginLeft: -24,
    width: 48,
    height: 48,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  playIcon: {
    color: "#fff",
    fontSize: 20,
  },
  overlayInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 14,
    paddingBottom: 12,
    paddingTop: 36,
    backgroundColor: "transparent",
  },
  overlayInfoInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  overlayName: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 15,
  },
  overlayRestaurant: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
    fontWeight: "500",
  },
  overlayPrice: {
    color: "#f97316",
    fontWeight: "800",
    fontSize: 13,
    marginTop: 2,
  },
  quickAddBtn: {
    backgroundColor: "#f97316",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    flexShrink: 0,
  },
  quickAddText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 12,
  },
});
