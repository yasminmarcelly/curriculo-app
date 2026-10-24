import { Calistoga_400Regular } from '@expo-google-fonts/calistoga';
import { Inter_400Regular, Inter_500Medium, Inter_700Bold, useFonts } from '@expo-google-fonts/inter';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import type { ColorValue } from 'react-native';
import { CurriculoProvider } from '../lib/CurriculoContext';
import { colors, fonts } from '../theme';

SplashScreen.preventAutoHideAsync();

type IconName = keyof typeof Ionicons.glyphMap;
const tab = (title: string, icon: IconName) => ({
  title,
  tabBarIcon: ({ color, size }: { color: ColorValue; size: number }) => <Ionicons name={icon} size={size} color={color as string} />,
});

export default function RootLayout() {
  const [loaded, error] = useFonts({ Calistoga_400Regular, Inter_400Regular, Inter_500Medium, Inter_700Bold });

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <CurriculoProvider>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.muted,
          tabBarLabelStyle: { fontFamily: fonts.medium, fontSize: 11 },
          tabBarStyle: { backgroundColor: colors.bg, borderTopColor: colors.line },
        }}
      >
        <Tabs.Screen name="index" options={tab('Início', 'home-outline')} />
        <Tabs.Screen name="sobre" options={tab('Sobre', 'information-circle-outline')} />
        <Tabs.Screen name="academica" options={tab('Acadêmica', 'school-outline')} />
        <Tabs.Screen name="profissional" options={tab('Profissional', 'briefcase-outline')} />
        <Tabs.Screen name="projetos" options={tab('Projetos', 'code-slash-outline')} />
      </Tabs>
    </CurriculoProvider>
  );
}
