import { StyleSheet, Text, View } from 'react-native';
import { Bullet, SectionTitle } from '../components/Parts';
import { Screen } from '../components/Screen';
import { colors, space, type } from '../theme';

const app = [
  'Expo SDK 58 e React Native 0.88, com TypeScript',
  'expo-router: navegação por abas baseada em arquivos',
  'expo-print e expo-sharing: geração e compartilhamento do PDF',
  'expo-font com Calistoga e Inter (Google Fonts)',
  'expo-constants: leitura da URL da API configurada no app.json',
  'expo-linking e Linking: abrir LinkedIn, GitHub e e-mail',
  '@expo/vector-icons (Ionicons) e react-native-safe-area-context',
  'EAS Update: publicação over-the-air para o Expo Go',
];

const backend = [
  'Express + TypeScript, hospedado no Vercel',
  'PostgreSQL no NeonDB, acessado com o driver pg',
  'zod para validar os dados do CRUD',
  'Postman para testar todas as rotas',
];

export default function Sobre() {
  return (
    <Screen title="Sobre o app">
      {() => (
        <View>
          <Text style={type.body}>
            Aplicativo de currículo que busca nome, formações, experiências, projetos, habilidades e idiomas em uma API
            própria. Dá para alternar entre dois currículos cadastrados no banco.
          </Text>

          <SectionTitle>Funcionalidade extra</SectionTitle>
          <View style={styles.extra}>
            <Text style={type.body}>
              Download do currículo em PDF: o app monta o documento no próprio celular com os dados exibidos e abre o
              menu de compartilhamento para salvar ou enviar.
            </Text>
          </View>

          <SectionTitle>Tecnologias do app</SectionTitle>
          <View style={{ gap: 8 }}>
            {app.map((i) => (
              <Bullet key={i}>{i}</Bullet>
            ))}
          </View>

          <SectionTitle>Tecnologias do back-end</SectionTitle>
          <View style={{ gap: 8 }}>
            {backend.map((i) => (
              <Bullet key={i}>{i}</Bullet>
            ))}
          </View>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  extra: { backgroundColor: colors.accentSoft, borderRadius: 12, padding: space.md },
});
