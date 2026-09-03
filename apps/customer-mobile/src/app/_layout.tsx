import "../global.css";
import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { useState } from 'react';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { LoginScreen } from '@/components/auth/LoginScreen';
import { RegisterScreen } from '@/components/auth/RegisterScreen';
import { ForgotPasswordScreen } from '@/components/auth/ForgotPasswordScreen';
import { useAppStore } from '@/store/useAppStore';

SplashScreen.preventAutoHideAsync();

type AuthScreen = 'login' | 'register' | 'forgot-password';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const login = useAppStore((state) => state.login);
  const [authScreen, setAuthScreen] = useState<AuthScreen>('login');

  const handleLogin = () => {
    login();
  };

  const handleRegister = () => {
    login();
  };

  const handleResetPassword = () => {
    setAuthScreen('login');
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      {isAuthenticated ? (
        <AppTabs />
      ) : (
        <>
          {authScreen === 'login' && (
            <LoginScreen
              onLogin={handleLogin}
              onRegister={() => setAuthScreen('register')}
              onForgotPassword={() => setAuthScreen('forgot-password')}
            />
          )}
          {authScreen === 'register' && (
            <RegisterScreen
              onRegister={handleRegister}
              onBackToLogin={() => setAuthScreen('login')}
            />
          )}
          {authScreen === 'forgot-password' && (
            <ForgotPasswordScreen
              onResetPassword={handleResetPassword}
              onBackToLogin={() => setAuthScreen('login')}
            />
          )}
        </>
      )}
    </ThemeProvider>
  );
}
