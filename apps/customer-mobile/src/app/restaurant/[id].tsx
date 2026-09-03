import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";
import { restaurants, menuItems } from "../../mocks/data";
import { useAppStore } from "../../store/useAppStore";
import { SafeAreaView } from "react-native-safe-area-context";
export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const restaurant = restaurants.find((r) => r.id === id);
  const items = menuItems.filter((m) => m.restaurantId === id);
  const addToCart = useAppStore((state) => state.addToCart);

  if (!restaurant) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View className="flex-1 bg-light-bg dark:bg-dark-bg items-center justify-center">
          <Text className="text-light-text dark:text-dark-text text-lg">
            Restaurant not found
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="mt-4 bg-[#f97316] px-4 py-2 rounded-lg"
          >
            <Text className="text-white font-bold">Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <View className="flex-1 bg-light-bg dark:bg-dark-bg">
        <ScrollView className="flex-1">
          <Image
            source={{ uri: restaurant.image }}
            className="w-full h-64"
            resizeMode="cover"
          />

        <View className="p-4 bg-light-surface dark:bg-dark-surface -mt-6 rounded-t-3xl">
          <View className="flex-row justify-between items-start mb-2">
            <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
              {restaurant.name}
            </Text>
            <View className="bg-[#f97316] px-2 py-1 rounded-md flex-row items-center">
              <Text className="text-white text-xs font-bold">
                {restaurant.rating} ★
              </Text>
            </View>
          </View>

          <Text className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-4">
            {restaurant.tags.join(" • ")}
          </Text>

          <View className="flex-row items-center mb-6">
            <View className="bg-light-bg dark:bg-dark-bg px-3 py-1.5 rounded mr-3">
              <Text className="text-sm font-medium text-light-text dark:text-dark-text">
                {restaurant.deliveryTime}
              </Text>
            </View>
            <View className="bg-light-bg dark:bg-dark-bg px-3 py-1.5 rounded">
              <Text className="text-sm font-medium text-light-text dark:text-dark-text">
                ${restaurant.deliveryFee.toFixed(2)} delivery
              </Text>
            </View>
          </View>

          <Text className="text-xl font-bold text-light-text dark:text-dark-text mb-4">
            Menu
          </Text>

          {items.map((item) => (
            <View
              key={item.id}
              className="flex-row mb-4 bg-light-bg dark:bg-dark-bg p-3 rounded-2xl border border-light-border dark:border-dark-border"
            >
              <Image
                source={{ uri: item.image }}
                className="w-20 h-20 rounded-xl mr-3"
              />
              <View className="flex-1 justify-between">
                <View>
                  <Text className="text-lg font-bold text-light-text dark:text-dark-text mb-1">
                    {item.name}
                  </Text>
                  <Text
                    className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-2"
                    numberOfLines={2}
                  >
                    {item.description}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <Text className="text-md font-bold text-[#f97316]">
                    ${item.price.toFixed(2)}
                  </Text>
                  <TouchableOpacity
                    className="bg-[#f97316] w-10 h-10 rounded-full items-center justify-center border-2 border-light-bg dark:border-dark-bg shadow-md"
                    onPress={() => {
                      console.log('Add to cart pressed:', item.name);
                      addToCart({
                        menuItemId: item.id,
                        quantity: 1,
                        price: item.price,
                        name: item.name,
                      });
                      Alert.alert('Added to Cart', `${item.name} has been added to your cart`);
                    }}
                    activeOpacity={0.7}
                  >
                    <Text className="text-white text-xl font-bold">+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      </View>
    </SafeAreaView>
  );
}
