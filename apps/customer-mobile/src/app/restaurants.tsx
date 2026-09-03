import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { restaurants } from '../mocks/data';

export default function RestaurantsScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<'all' | 'rating' | 'speed' | 'free_delivery'>('all');

  // Filter restaurants
  let filteredRestaurants = restaurants;
  if (activeFilter === 'rating') {
    filteredRestaurants = [...restaurants].sort((a, b) => b.rating - a.rating);
  } else if (activeFilter === 'speed') {
    filteredRestaurants = [...restaurants].sort((a, b) => a.deliveryTime.localeCompare(b.deliveryTime));
  } else if (activeFilter === 'free_delivery') {
    filteredRestaurants = restaurants.filter(r => r.deliveryFee <= 1.99);
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <View className="flex-1 bg-light-bg dark:bg-dark-bg">
        <ScrollView className="flex-1 px-4 pt-2">
          <View className="mb-6">
            <Text className="text-2xl font-bold text-light-text dark:text-dark-text mb-2">
              All Restaurants
            </Text>
            <Text className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
              {filteredRestaurants.length} restaurants available
            </Text>
          </View>

          {/* Filter Pills */}
          <View className="mb-6">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2">
              {[
                { id: 'all', label: 'All' },
                { id: 'rating', label: '⭐ Top Rated' },
                { id: 'speed', label: '⚡ Fastest' },
                { id: 'free_delivery', label: '🛵 Low Fee' },
              ].map((filter) => (
                <TouchableOpacity
                  key={filter.id}
                  onPress={() => setActiveFilter(filter.id as any)}
                  className={`px-3 py-1.5 rounded-xl mr-2 ${
                    activeFilter === filter.id
                      ? 'bg-[#f3f3f3] border-2 border-[#f97316]'
                      : 'bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border'
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      activeFilter === filter.id
                        ? 'text-[#f97316]'
                        : 'text-light-text dark:text-dark-text'
                    }`}
                  >
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Restaurant List */}
          <View className="mb-8">
            {filteredRestaurants.map((restaurant) => (
              <TouchableOpacity
                key={restaurant.id}
                className="bg-light-surface dark:bg-dark-surface rounded-2xl mb-4 border border-light-border dark:border-dark-border overflow-hidden"
                onPress={() => router.push(`/restaurant/${restaurant.id}`)}
              >
                <Image
                  source={{ uri: restaurant.image }}
                  className="w-full h-40"
                  resizeMode="cover"
                />
                <View className="p-4">
                  <View className="flex-row justify-between items-start mb-1">
                    <Text className="text-lg font-bold text-light-text dark:text-dark-text">
                      {restaurant.name}
                    </Text>
                    <View className="bg-[#f97316] px-2 py-1 rounded-md flex-row items-center">
                      <Text className="text-white text-xs font-bold">{restaurant.rating} ★</Text>
                    </View>
                  </View>
                  <Text className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-2">
                    {restaurant.tags.join(' • ')}
                  </Text>
                  <View className="flex-row items-center">
                    <View className="bg-light-bg dark:bg-dark-bg px-2 py-1 rounded mr-2">
                      <Text className="text-xs text-light-text dark:text-dark-text">{restaurant.deliveryTime}</Text>
                    </View>
                    <View className="bg-light-bg dark:bg-dark-bg px-2 py-1 rounded">
                      <Text className="text-xs text-light-text dark:text-dark-text">${restaurant.deliveryFee.toFixed(2)} delivery</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
