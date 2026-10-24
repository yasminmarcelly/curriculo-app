import type { ReactNode } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, space, type } from '../theme';

export function Chip({ label }: { label: string }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipText}>{label}</Text>
    </View>
  );
}

export function ChipRow({ items }: { items: string[] }) {
  return (
    <View style={styles.row}>
      {items.map((i) => (
        <Chip key={i} label={i} />
      ))}
    </View>
  );
}

export function SectionTitle({ children }: { children: string }) {
  return <Text style={[type.heading, styles.section]}>{children}</Text>;
}

/** Item de linha do tempo: a linha vertical indica ordem cronológica. */
export function TimelineItem({
  title,
  place,
  period,
  badge,
  children,
}: {
  title: string;
  place?: string | null;
  period?: string | null;
  badge?: string | null;
  children?: ReactNode;
}) {
  return (
    <View style={styles.timeline}>
      <View style={styles.dot} />
      {period ? <Text style={type.small}>{period}</Text> : null}
      <Text style={[type.item, { marginTop: 2 }]}>{title}</Text>
      {place ? <Text style={[type.body, { color: colors.muted }]}>{place}</Text> : null}
      {badge ? <Text style={[type.small, { color: colors.accent, marginTop: 2 }]}>{badge}</Text> : null}
      {children ? <View style={{ marginTop: space.sm, gap: 6 }}>{children}</View> : null}
    </View>
  );
}

export function Bullet({ children }: { children: string }) {
  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <Text style={[type.body, { color: colors.accent }]}>–</Text>
      <Text style={[type.body, { flex: 1 }]}>{children}</Text>
    </View>
  );
}

export function LinkButton({ label, url }: { label: string; url: string }) {
  return (
    <Pressable onPress={() => Linking.openURL(url)} style={styles.link} accessibilityRole="link">
      <Text style={styles.linkText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: colors.accentSoft, borderRadius: 999, paddingVertical: 6, paddingHorizontal: 12 },
  chipText: { fontFamily: fonts.medium, fontSize: 13, color: colors.accent },
  section: { marginTop: space.xl, marginBottom: space.md },
  timeline: { borderLeftWidth: 2, borderLeftColor: colors.line, paddingLeft: space.md, paddingBottom: space.lg },
  dot: {
    position: 'absolute',
    left: -6,
    top: 3,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.accent,
  },
  link: { paddingVertical: 8 },
  linkText: { fontFamily: fonts.medium, fontSize: 15, color: colors.accent, textDecorationLine: 'underline' },
});
