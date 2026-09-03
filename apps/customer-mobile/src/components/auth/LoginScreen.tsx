import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Chrome, Apple as AppleIcon } from "lucide-react-native";

interface LoginScreenProps {
  onLogin: () => void;
  onRegister?: () => void;
  onForgotPassword?: () => void;
}

export function LoginScreen({ onLogin, onRegister, onForgotPassword }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View className="flex-1 justify-center items-center bg-light-bg dark:bg-dark-bg px-6">
      <View className="w-full max-w-sm">
        <Text className="text-4xl font-bold text-center mb-2 text-light-text dark:text-dark-text">
          Umunthuhub
        </Text>
        <Text className="text-lg text-center mb-8 text-light-textSecondary dark:text-dark-textSecondary">
          Delicious food, delivered fast.
        </Text>

        <View className="mb-4">
          <Text className="text-sm font-medium mb-1 text-light-textMuted dark:text-dark-textMuted">
            Email
          </Text>
          <TextInput
            className="w-full bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-light-text dark:text-dark-text"
            placeholder="Enter your email"
            placeholderTextColor="#7a7a7a"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm font-medium mb-1 text-light-textMuted dark:text-dark-textMuted">
            Password
          </Text>
          <TextInput
            className="w-full bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-light-text dark:text-dark-text"
            placeholder="Enter your password"
            placeholderTextColor="#7a7a7a"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          className="self-end mb-4"
          onPress={onForgotPassword}
        >
          <Text className="text-sm text-[#f97316] font-medium">Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-full bg-[#f97316] py-3.5 rounded-lg items-center"
          onPress={onLogin}
        >
          <Text className="text-white font-bold text-lg">Sign In</Text>
        </TouchableOpacity>

        <View className="mt-6 flex-row justify-center">
          <Text className="text-light-textSecondary dark:text-dark-textSecondary">
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity onPress={onRegister}>
            <Text className="text-[#f97316] font-medium">Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-8">
          <View className="flex-row items-center mb-4">
            <View className="flex-1 h-px bg-light-border dark:border-dark-border" />
            <Text className="mx-4 text-light-textSecondary dark:text-dark-textSecondary text-sm">
              Or continue with
            </Text>
            <View className="flex-1 h-px bg-light-border dark:border-dark-border" />
          </View>
          <View className="flex-row justify-center space-x-4 gap-4">
            <TouchableOpacity className="flex-1 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border py-3 rounded-lg items-center flex-row justify-center gap-2">
              <Chrome size={20} color="#7a7a7a" />
              <Text className="font-medium text-light-text dark:text-dark-text">
                Google
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border py-3 rounded-lg items-center flex-row justify-center gap-2">
              <AppleIcon size={20} color="#7a7a7a" />
              <Text className="font-medium text-light-text dark:text-dark-text">
                Apple
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
