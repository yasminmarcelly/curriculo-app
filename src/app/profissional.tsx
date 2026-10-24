import { Bullet, TimelineItem } from '../components/Parts';
import { Empty, Screen } from '../components/Screen';
import { periodo } from '../lib/CurriculoContext';

export default function Profissional() {
  return (
    <Screen title="Experiência profissional">
      {(c) =>
        c.experiencias.length === 0 ? (
          <Empty>Nenhuma experiência cadastrada.</Empty>
        ) : (
          c.experiencias.map((e) => (
            <TimelineItem
              key={e.id}
              title={e.cargo}
              place={e.empresa}
              period={periodo(e.inicio, e.fim, e.atual)}
            >
              {e.atividades.map((a) => (
                <Bullet key={a}>{a}</Bullet>
              ))}
            </TimelineItem>
          ))
        )
      }
    </Screen>
  );
}
