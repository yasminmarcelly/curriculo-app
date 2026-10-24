export type Pessoa = {
  id: number;
  nome: string;
  titulo: string | null;
  objetivo: string | null;
  cidade: string | null;
  email: string | null;
  telefone: string | null;
  linkedin: string | null;
  github: string | null;
};

export type Formacao = {
  id: number;
  tipo: string;
  curso: string;
  instituicao: string | null;
  inicio: string | null;
  fim: string | null;
  status: string | null;
  detalhes: string | null;
};

export type Experiencia = {
  id: number;
  cargo: string;
  empresa: string | null;
  inicio: string | null;
  fim: string | null;
  atual: boolean;
  atividades: string[];
};

export type Projeto = {
  id: number;
  nome: string;
  descricao: string | null;
  tecnologias: string[];
  link: string | null;
};

export type Habilidade = { id: number; nome: string; categoria: string | null };
export type Idioma = { id: number; idioma: string; nivel: string | null };

export type Curriculo = Pessoa & {
  formacoes: Formacao[];
  experiencias: Experiencia[];
  projetos: Projeto[];
  habilidades: Habilidade[];
  idiomas: Idioma[];
};
