import { Tabs } from 'expo-router';
import { useColorScheme, TouchableOpacity, View } from 'react-native';
import { Home, ShoppingCart, FileText, User } from 'lucide-react-native';

import { useAppStore } from '@/store/useAppStore';
import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];
  const cartCount = useAppStore((state) => state.cartCount());

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#f97316',
        tabBarInactiveTintColor: colors.text,
        tabBarStyle: {
          backgroundColor: colors.background,
        },
        headerShown: false,
        tabBarButton: (props) => {
          const { disabled, onBlur, delayLongPress, onFocus, onLongPress, onPress, onPressIn, onPressOut, ...rest } = props as any;
          return (
            <TouchableOpacity
              {...rest}
              activeOpacity={1}
              disabled={disabled ?? undefined}
              onBlur={onBlur ?? undefined}
              delayLongPress={delayLongPress ?? undefined}
              onFocus={onFocus ?? undefined}
              onLongPress={onLongPress ?? undefined}
              onPress={onPress ?? undefined}
              onPressIn={onPressIn ?? undefined}
              onPressOut={onPressOut ?? undefined}
            />
          );
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <View className={`px-4 py-1 rounded-2xl ${focused ? 'bg-[#f97316]/15' : 'bg-transparent'}`}>
              <Home size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
          tabBarIcon: ({ color, size, focused }) => (
            <View className={`px-4 py-1 rounded-2xl ${focused ? 'bg-[#f97316]/15' : 'bg-transparent'}`}>
              <ShoppingCart size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, size, focused }) => (
            <View className={`px-4 py-1 rounded-2xl ${focused ? 'bg-[#f97316]/15' : 'bg-transparent'}`}>
              <FileText size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <View className={`px-4 py-1 rounded-2xl ${focused ? 'bg-[#f97316]/15' : 'bg-transparent'}`}>
              <User size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="restaurants"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="restaurant/[id]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
