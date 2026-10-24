import { Empty, Screen } from '../components/Screen';
import { TimelineItem } from '../components/Parts';
import { periodo } from '../lib/CurriculoContext';

export default function Academica() {
  return (
    <Screen title="Experiência acadêmica">
      {(c) =>
        c.formacoes.length === 0 ? (
          <Empty>Nenhuma formação cadastrada.</Empty>
        ) : (
          c.formacoes.map((f) => (
            <TimelineItem
              key={f.id}
              title={f.curso}
              place={f.instituicao}
              period={periodo(f.inicio, f.fim)}
              badge={f.status}
            >
              {null}
            </TimelineItem>
          ))
        )
      }
    </Screen>
  );
}
