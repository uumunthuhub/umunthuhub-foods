import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { ArrowLeft, Mail } from "lucide-react-native";

interface ForgotPasswordScreenProps {
  onResetPassword: () => void;
  onBackToLogin?: () => void;
}

export function ForgotPasswordScreen({ onResetPassword, onBackToLogin }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState("");

  return (
    <View className="flex-1 justify-center items-center bg-light-bg dark:bg-dark-bg px-6">
      <View className="w-full max-w-sm">
        <TouchableOpacity onPress={onBackToLogin} className="mb-6">
          <ArrowLeft size={24} color="#7a7a7a" />
        </TouchableOpacity>

        <View className="items-center mb-8">
          <View className="w-16 h-16 bg-[#f97316]/20 rounded-full items-center justify-center mb-4">
            <Mail size={32} color="#f97316" />
          </View>
          <Text className="text-2xl font-bold text-center mb-2 text-light-text dark:text-dark-text">
            Forgot Password?
          </Text>
          <Text className="text-center text-light-textSecondary dark:text-dark-textSecondary">
            Enter your email address and we'll send you a link to reset your password.
          </Text>
        </View>

        <View className="mb-6">
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

        <TouchableOpacity
          className="w-full bg-[#f97316] py-3.5 rounded-lg items-center"
          onPress={onResetPassword}
        >
          <Text className="text-white font-bold text-lg">Send Reset Link</Text>
        </TouchableOpacity>

        <View className="mt-6 flex-row justify-center">
          <TouchableOpacity onPress={onBackToLogin}>
            <Text className="text-[#f97316] font-medium">Back to Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
