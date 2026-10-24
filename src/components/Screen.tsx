import type { ReactNode } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { primeiroNome, useCurriculo } from '../lib/CurriculoContext';
import type { Curriculo } from '../lib/types';
import { colors, fonts, space, type } from '../theme';

type Props = { title: string; children: (c: Curriculo) => ReactNode };

export function Screen({ title, children }: Props) {
  const { curriculo, status, reload } = useCurriculo();

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        {curriculo && <Text style={type.small}>{primeiroNome(curriculo.nome)}</Text>}
        <Text style={[type.title, styles.title]}>{title}</Text>

        {status === 'error' && (
          <View style={styles.state}>
            <Text style={type.body}>Não foi possível carregar o currículo. Confira sua conexão e tente de novo.</Text>
            <Pressable onPress={reload} style={styles.button} accessibilityRole="button">
              <Text style={styles.buttonText}>Tentar novamente</Text>
            </Pressable>
          </View>
        )}
        {status === 'loading' && !curriculo && <ActivityIndicator color={colors.accent} style={{ marginTop: space.xl }} />}
        {curriculo && status !== 'error' && children(curriculo)}
      </ScrollView>
    </SafeAreaView>
  );
}

export function Empty({ children }: { children: string }) {
  return <Text style={[type.body, { color: colors.muted }]}>{children}</Text>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: space.lg, paddingBottom: space.xl * 2 },
  title: { marginBottom: space.lg },
  state: { gap: space.md, alignItems: 'flex-start' },
  button: { backgroundColor: colors.accent, paddingVertical: 12, paddingHorizontal: 18, borderRadius: 10 },
  buttonText: { color: '#fff', fontFamily: fonts.medium, fontSize: 15 },
});
