import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Chrome, Apple as AppleIcon } from "lucide-react-native";
import { Confetti } from "../Confetti";

interface RegisterScreenProps {
  onRegister: () => void;
  onBackToLogin?: () => void;
}

export function RegisterScreen({ onRegister, onBackToLogin }: RegisterScreenProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const handleRegister = () => {
    setShowConfetti(true);
    setTimeout(() => onRegister(), 1400);
  };

  return (
    <View className="flex-1 justify-center items-center bg-light-bg dark:bg-dark-bg px-6">
      <Confetti running={showConfetti} onDone={() => setShowConfetti(false)} />
      <View className="w-full max-w-sm">
        <Text className="text-4xl font-bold text-center mb-2 text-light-text dark:text-dark-text">
          Create Account
        </Text>
        <Text className="text-lg text-center mb-8 text-light-textSecondary dark:text-dark-textSecondary">
          Join Umunthuhub for delicious food
        </Text>

        <View className="mb-4">
          <Text className="text-sm font-medium mb-1 text-light-textMuted dark:text-dark-textMuted">
            Full Name
          </Text>
          <TextInput
            className="w-full bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-light-text dark:text-dark-text"
            placeholder="Enter your full name"
            placeholderTextColor="#7a7a7a"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        </View>

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
            placeholder="Create a password"
            placeholderTextColor="#7a7a7a"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View className="mb-6">
          <Text className="text-sm font-medium mb-1 text-light-textMuted dark:text-dark-textMuted">
            Confirm Password
          </Text>
          <TextInput
            className="w-full bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-light-text dark:text-dark-text"
            placeholder="Confirm your password"
            placeholderTextColor="#7a7a7a"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          className="w-full bg-[#f97316] py-3.5 rounded-lg items-center"
          onPress={handleRegister}
        >
          <Text className="text-white font-bold text-lg">Create Account</Text>
        </TouchableOpacity>

        <View className="mt-6 flex-row justify-center">
          <Text className="text-light-textSecondary dark:text-dark-textSecondary">
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={onBackToLogin}>
            <Text className="text-[#f97316] font-medium">Sign In</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-8">
          <View className="flex-row items-center mb-4">
            <View className="flex-1 h-px bg-light-border dark:border-dark-border" />
            <Text className="mx-4 text-light-textSecondary dark:text-dark-textSecondary text-sm">
              Or sign up with
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
