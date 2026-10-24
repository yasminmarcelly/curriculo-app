import { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ChipRow, LinkButton, SectionTitle } from '../components/Parts';
import { Screen } from '../components/Screen';
import { primeiroNome, useCurriculo } from '../lib/CurriculoContext';
import { baixarCurriculo } from '../lib/pdf';
import type { Curriculo } from '../lib/types';
import { colors, fonts, space, type } from '../theme';

function Switcher() {
  const { pessoas, selectedId, select } = useCurriculo();
  if (pessoas.length < 2) return null;
  return (
    <View style={styles.switcher} accessibilityRole="tablist">
      {pessoas.map((p) => {
        const active = p.id === selectedId;
        return (
          <Pressable
            key={p.id}
            onPress={() => select(p.id)}
            style={[styles.seg, active && styles.segActive]}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
          >
            <Text style={[styles.segText, active && styles.segTextActive]}>{primeiroNome(p.nome)}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function Download({ c }: { c: Curriculo }) {
  const [busy, setBusy] = useState(false);
  const onPress = async () => {
    setBusy(true);
    try {
      await baixarCurriculo(c);
    } catch (e) {
      Alert.alert('Não foi possível gerar o PDF', e instanceof Error ? e.message : 'Tente novamente.');
    } finally {
      setBusy(false);
    }
  };
  return (
    <Pressable onPress={onPress} disabled={busy} style={styles.download} accessibilityRole="button">
      {busy ? <ActivityIndicator color="#fff" /> : <Ionicons name="download-outline" size={20} color="#fff" />}
      <Text style={styles.downloadText}>{busy ? 'Gerando PDF…' : 'Baixar currículo em PDF'}</Text>
    </Pressable>
  );
}

export default function Home() {
  return (
    <Screen title="Currículo">
      {(c) => (
        <View>
          <Switcher />
          <Text style={[type.heading, { fontSize: 28, lineHeight: 34 }]}>{c.nome}</Text>
          {c.titulo ? <Text style={[type.body, styles.sub]}>{c.titulo}</Text> : null}
          {c.cidade ? <Text style={type.small}>{c.cidade}</Text> : null}

          {c.objetivo ? (
            <>
              <SectionTitle>Objetivo</SectionTitle>
              <Text style={type.body}>{c.objetivo}</Text>
            </>
          ) : null}

          <View style={{ marginTop: space.lg }}>
            <Download c={c} />
          </View>

          {c.habilidades.length > 0 && (
            <>
              <SectionTitle>Habilidades</SectionTitle>
              <ChipRow items={c.habilidades.map((h) => h.nome)} />
            </>
          )}

          {c.idiomas.length > 0 && (
            <>
              <SectionTitle>Idiomas</SectionTitle>
              {c.idiomas.map((i) => (
                <Text key={i.id} style={type.body}>
                  {i.idioma}: {i.nivel}
                </Text>
              ))}
            </>
          )}

          {(c.linkedin || c.github || c.email) && (
            <>
              <SectionTitle>Contato</SectionTitle>
              {c.linkedin && <LinkButton label="LinkedIn" url={c.linkedin} />}
              {c.github && <LinkButton label="GitHub" url={c.github} />}
              {c.email && <LinkButton label={c.email} url={`mailto:${c.email}`} />}
            </>
          )}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  switcher: { flexDirection: 'row', backgroundColor: colors.surface, borderRadius: 12, padding: 4, marginBottom: space.lg },
  seg: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 9 },
  segActive: { backgroundColor: colors.bg },
  segText: { fontFamily: fonts.medium, fontSize: 14, color: colors.muted },
  segTextActive: { color: colors.ink },
  sub: { color: colors.muted, marginTop: space.xs },
  download: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    paddingVertical: 14,
    borderRadius: 12,
  },
  downloadText: { color: '#fff', fontFamily: fonts.medium, fontSize: 16 },
});
