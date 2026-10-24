import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { api } from './api';
import type { Curriculo, Pessoa } from './types';

type Status = 'loading' | 'ready' | 'error';

type Value = {
  pessoas: Pessoa[];
  selectedId: number | null;
  curriculo: Curriculo | null;
  status: Status;
  select: (id: number) => void;
  reload: () => void;
};

const Ctx = createContext<Value | null>(null);

export function CurriculoProvider({ children }: { children: ReactNode }) {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [curriculo, setCurriculo] = useState<Curriculo | null>(null);
  const [status, setStatus] = useState<Status>('loading');
  const [tick, setTick] = useState(0);

  const reload = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    (async () => {
      try {
        const lista = pessoas.length ? pessoas : await api.pessoas();
        const id = selectedId ?? lista[0]?.id ?? null;
        if (id === null) throw new Error('Nenhum currículo cadastrado');
        const dados = await api.curriculo(id);
        if (cancelled) return;
        setPessoas(lista);
        setSelectedId(id);
        setCurriculo(dados);
        setStatus('ready');
      } catch {
        if (!cancelled) setStatus('error');
      }
    })();
    return () => {
      cancelled = true;
    };
    // pessoas é carregada uma única vez; só refaz a busca ao trocar a pessoa ou recarregar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, tick]);

  const value = useMemo<Value>(
    () => ({ pessoas, selectedId, curriculo, status, select: setSelectedId, reload }),
    [pessoas, selectedId, curriculo, status, reload],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCurriculo() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useCurriculo precisa estar dentro de CurriculoProvider');
  return v;
}

export const primeiroNome = (nome: string) => nome.split(' ')[0];
export const periodo = (inicio: string | null, fim: string | null, atual = false) => {
  if (!inicio && !fim) return null;
  return `${inicio ?? ''} – ${atual ? 'atual' : (fim ?? '')}`.trim();
};
