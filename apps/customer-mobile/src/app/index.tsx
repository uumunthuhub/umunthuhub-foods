import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Image,
  ToastAndroid, Platform, Alert, Animated, StyleSheet, useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Utensils, Pizza, Salad, Fish, IceCream, Check } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { categories, restaurants, menuItems } from '../mocks/data';
import { VideoCarousel } from '../components/VideoCarousel';
import { useAppStore } from '../store/useAppStore';

// ---- Greeting animation ----
function getTimeOfDay() {
  const h = new Date().getHours();
  if (h < 12) return { greet: 'Good morning', meal: 'breakfast' };
  if (h < 17) return { greet: 'Good afternoon', meal: 'lunch' };
  return { greet: 'Good evening', meal: 'dinner' };
}

function AnimatedGreeting() {
  const { greet, meal } = getTimeOfDay();
  const scheme = useColorScheme();
  const dark = scheme === 'dark';

  // Phase: 0 = greeting visible, 1 = greeting fading out, 2 = subtitle visible
  const [phase, setPhase] = useState(0);
  const greetOpacity = useRef(new Animated.Value(0)).current;
  const subOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in greeting
    Animated.timing(greetOpacity, {
      toValue: 1, duration: 700, useNativeDriver: true,
    }).start(() => {
      // Hold for 2.2s then fade out
      setTimeout(() => {
        Animated.timing(greetOpacity, {
          toValue: 0, duration: 900, useNativeDriver: true,
        }).start(() => {
          setPhase(2);
          // Fade in subtitle
          Animated.timing(subOpacity, {
            toValue: 1, duration: 700, useNativeDriver: true,
          }).start();
        });
      }, 2200);
    });
  }, []);

  const primary = '#f97316';
  const textColor = dark ? '#f5f5f5' : '#1a1c1c';
  const mutedColor = dark ? '#9a9a9a' : '#7a6058';

  return (
    <View style={{ minHeight: 58, marginBottom: 10, justifyContent: 'center' }}>
      {/* Greeting line */}
      <Animated.View style={{ opacity: greetOpacity, position: phase === 2 ? 'absolute' : 'relative' }}>
        <Text style={{ fontSize: 22, fontWeight: '900', color: textColor, marginTop: 2 }}>
          {greet}, Grayson 👋
        </Text>
      </Animated.View>

      {/* Subtitle that replaces it */}
      {phase === 2 && (
        <Animated.View style={{ opacity: subOpacity }}>
          <Text style={{ fontSize: 22, fontWeight: '900', color: textColor, marginTop: 2 }}>
            What can we get you for {meal}?
          </Text>
        </Animated.View>
      )}
    </View>
  );
}

// ---- Home Screen ----
export default function HomeScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const dark = scheme === 'dark';
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const cartCount = useAppStore((s) => s.cartCount);

  const bg = dark ? '#111213' : '#f5f0eb';
  const surface = dark ? '#1c1e1f' : '#fffcfa';
  const border = dark ? '#2e3030' : '#ddc8bd';
  const textPrimary = dark ? '#f5f5f5' : '#1a1c1c';
  const textSecondary = dark ? '#9a9a9a' : '#7a6058';
  const orange = '#f97316';

  const handleQuickAdd = useCallback((item: { name: string; price: number }) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(`${item.name} added to cart! 🛒`, ToastAndroid.SHORT);
    } else {
      Alert.alert('Added to Cart ✅', `${item.name} ($${item.price.toFixed(2)}) added!`);
    }
  }, []);

  const heroVideos = [
    {
      video: 'https://res.cloudinary.com/irouybuw/video/upload/v1788421604/Assembling_wagyu_burger_with_cheese_202608191233.mp4',
      name: 'Signature Truffle Burger',
      restaurant: 'Green Bistro',
      price: 18.99,
    },
    {
      video: 'https://res.cloudinary.com/irouybuw/video/upload/v1788421603/Chef_slicing_salmon_sushi_roll_202608192132.mp4',
      name: 'Dragon Roll Sushi',
      restaurant: 'Tokyo Sushi House',
      price: 24.99,
    },
    {
      video: 'https://res.cloudinary.com/irouybuw/video/upload/v1788421584/Chopsticks_lifting_noodle_from_r__202608192141.mp4',
      name: 'Spicy Miso Ramen',
      restaurant: 'Noodle Master',
      price: 16.99,
    },
    {
      video: 'https://res.cloudinary.com/irouybuw/video/upload/v1788421592/Sauce_drizzling_over_fried_chicken_202608191449.mp4',
      name: 'Crispy Fried Chicken',
      restaurant: 'Southern Comfort',
      price: 14.99,
    },
  ];

  const displayRestaurants = activeCategory
    ? restaurants.filter((r) => r.tags.includes(activeCategory))
    : restaurants;

  const displayMenu = activeCategory
    ? menuItems.filter((m) => {
        const cat = categories.find((c) => c.id === m.categoryId);
        return cat?.name === activeCategory;
      })
    : menuItems;

  const getCategoryIcon = (name: string, color: string) => {
    switch (name) {
      case 'Burger': return <Utensils color={color} size={22} strokeWidth={2.5} />;
      case 'Pizza': return <Pizza color={color} size={22} strokeWidth={2.5} />;
      case 'Healthy': return <Salad color={color} size={22} strokeWidth={2.5} />;
      case 'Sushi': return <Fish color={color} size={22} strokeWidth={2.5} />;
      case 'Dessert': return <IceCream color={color} size={22} strokeWidth={2.5} />;
      default: return <Check color={color} size={22} strokeWidth={2.5} />;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg }} edges={['top']}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Animated greeting */}
        <AnimatedGreeting />

        {/* Hero video carousel */}
        <VideoCarousel videos={heroVideos} onQuickAdd={handleQuickAdd} />

        {/* Categories */}
        <View style={{ marginBottom: 24 }}>
          <Text style={[styles.sectionTitle, { color: textPrimary }]}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
            {categories.map((category) => {
              const isSelected = activeCategory === category.name;
              return (
                <TouchableOpacity
                  key={category.id}
                  onPress={() => setActiveCategory(isSelected ? null : category.name)}
                  style={[
                    styles.categoryChip,
                    {
                      backgroundColor: isSelected ? orange : surface,
                      borderColor: isSelected ? orange : border,
                    },
                  ]}
                >
                  <View style={{ marginBottom: 4 }}>
                    {getCategoryIcon(category.name, isSelected ? '#fff' : textPrimary)}
                  </View>
                  <Text style={{ fontSize: 11, fontWeight: '800', color: isSelected ? '#fff' : textPrimary }}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Featured Restaurants */}
        <View style={{ marginBottom: 24 }}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: textPrimary }]}>Featured Restaurants</Text>
            <TouchableOpacity onPress={() => router.push('/restaurants')}>
              <Text style={{ color: orange, fontWeight: '700', fontSize: 13 }}>See all →</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10 }}>
            {displayRestaurants.slice(0, 3).map((restaurant) => (
              <TouchableOpacity
                key={restaurant.id}
                style={[styles.restaurantCard, { backgroundColor: surface, borderColor: border }]}
                activeOpacity={0.85}
                onPress={() => router.push(`/restaurant/${restaurant.id}`)}
              >
                <Image
                  source={{ uri: restaurant.image }}
                  style={{ width: '100%', height: 150, borderTopLeftRadius: 18, borderTopRightRadius: 18 }}
                  resizeMode="cover"
                />
                {/* Rating badge over image */}
                <View style={styles.ratingBadge}>
                  <Text style={{ color: '#fff', fontWeight: '800', fontSize: 12 }}>
                    ⭐ {restaurant.rating}
                  </Text>
                </View>
                <View style={{ padding: 14 }}>
                  <Text style={{ fontSize: 16, fontWeight: '800', color: textPrimary, marginBottom: 4 }}>
                    {restaurant.name}
                  </Text>
                  <Text style={{ fontSize: 12, color: textSecondary, marginBottom: 8 }}>
                    {restaurant.tags.join(' · ')}
                  </Text>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <View style={[styles.infoPill, { backgroundColor: dark ? '#2a2a2a' : '#f5f0eb', borderColor: border }]}>
                      <Text style={{ fontSize: 11, color: textSecondary, fontWeight: '600' }}>
                        🕐 {restaurant.deliveryTime}
                      </Text>
                    </View>
                    <View style={[styles.infoPill, { backgroundColor: dark ? '#2a2a2a' : '#f5f0eb', borderColor: border }]}>
                      <Text style={{ fontSize: 11, color: textSecondary, fontWeight: '600' }}>
                        🛵 ${restaurant.deliveryFee.toFixed(2)} delivery
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Popular Dishes */}
        <View style={{ marginBottom: 24 }}>
          <Text style={[styles.sectionTitle, { color: textPrimary }]}>Popular Dishes</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
            {displayMenu
              .filter((item) => item.isPopular)
              .map((item) => {
                const restaurant = restaurants.find((r) => r.id === item.restaurantId);
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.dishCard, { backgroundColor: surface, borderColor: border }]}
                    activeOpacity={0.85}
                    onPress={() => router.push(`/restaurant/${item.restaurantId}`)}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={{ width: '100%', height: 110, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
                      resizeMode="cover"
                    />
                    <View style={{ padding: 10 }}>
                      <Text style={{ fontWeight: '800', color: textPrimary, fontSize: 13 }} numberOfLines={1}>
                        {item.name}
                      </Text>
                      <Text style={{ color: textSecondary, fontSize: 11, marginTop: 2 }} numberOfLines={1}>
                        {restaurant?.name}
                      </Text>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                        <Text style={{ color: orange, fontWeight: '900', fontSize: 14 }}>
                          ${item.price.toFixed(2)}
                        </Text>
                        <View style={{ backgroundColor: orange, width: 28, height: 28, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ color: '#fff', fontSize: 18, fontWeight: '800', lineHeight: 22 }}>+</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>

        {/* Popular Cuisines */}
        <View style={{ marginBottom: 8 }}>
          <Text style={[styles.sectionTitle, { color: textPrimary }]}>Popular Cuisines</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
            {['🥗 Healthy', '🍔 Burgers', '🍣 Sushi', '🍕 Italian', '🌱 Vegan', '🥩 Halal', '🍜 Asian', '🌮 Mexican'].map((cuisine, idx) => (
              <TouchableOpacity
                key={idx}
                style={[styles.cuisineChip, { backgroundColor: surface, borderColor: border }]}
              >
                <Text style={{ fontSize: 13, fontWeight: '700', color: textPrimary }}>{cuisine}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryChip: {
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 10,
    minWidth: 70,
  },
  restaurantCard: {
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  ratingBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  infoPill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
  dishCard: {
    width: 180,
    borderRadius: 18,
    borderWidth: 1,
    marginRight: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cuisineChip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 12,
    borderWidth: 1,
  },
});
