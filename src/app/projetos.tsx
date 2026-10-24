import { StyleSheet, Text, View } from 'react-native';
import { ChipRow, LinkButton } from '../components/Parts';
import { Empty, Screen } from '../components/Screen';
import { primeiroNome } from '../lib/CurriculoContext';
import { colors, space, type } from '../theme';

export default function Projetos() {
  return (
    <Screen title="Projetos">
      {(c) =>
        c.projetos.length === 0 ? (
          <Empty>{`${primeiroNome(c.nome)} ainda não tem projetos cadastrados.`}</Empty>
        ) : (
          c.projetos.map((p) => (
            <View key={p.id} style={styles.item}>
              <Text style={type.heading}>{p.nome}</Text>
              {p.descricao ? <Text style={[type.body, { marginVertical: space.sm }]}>{p.descricao}</Text> : null}
              {p.tecnologias.length > 0 && <ChipRow items={p.tecnologias} />}
              {p.link ? <LinkButton label="Ver projeto" url={p.link} /> : null}
            </View>
          ))
        )
      }
    </Screen>
  );
}

const styles = StyleSheet.create({
  item: { paddingBottom: space.lg, marginBottom: space.lg, borderBottomWidth: 1, borderBottomColor: colors.line },
});
