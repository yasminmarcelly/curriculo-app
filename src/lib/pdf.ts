import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { periodo } from './CurriculoContext';
import type { Curriculo } from './types';

const esc = (s: string | null | undefined) =>
  (s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function html(c: Curriculo) {
  const contato = [c.cidade, c.email, c.telefone, c.linkedin, c.github].filter(Boolean).map(esc).join(' | ');
  const bloco = (titulo: string, itens: string[]) =>
    itens.length ? `<h2>${titulo}</h2>${itens.join('')}` : '';

  const formacoes = c.formacoes.map(
    (f) =>
      `<div class="item"><b>${esc(f.curso)}</b>${f.instituicao ? ` – ${esc(f.instituicao)}` : ''}<br/><span>${esc(
        [periodo(f.inicio, f.fim), f.status].filter(Boolean).join(' · '),
      )}</span></div>`,
  );
  const experiencias = c.experiencias.map(
    (e) =>
      `<div class="item"><b>${esc(e.cargo)}</b>${e.empresa ? ` – ${esc(e.empresa)}` : ''}<br/><span>${esc(
        periodo(e.inicio, e.fim, e.atual),
      )}</span><ul>${e.atividades.map((a) => `<li>${esc(a)}</li>`).join('')}</ul></div>`,
  );
  const projetos = c.projetos.map(
    (p) =>
      `<div class="item"><b>${esc(p.nome)}</b><br/>${esc(p.descricao)}<br/><span>${esc(p.tecnologias.join(', '))}</span></div>`,
  );

  return `<html><head><meta charset="utf-8"/><style>
    body{font-family:Helvetica,Arial,sans-serif;color:#1F2430;padding:32px;font-size:12px;line-height:1.5}
    h1{font-size:24px;margin:0}h2{font-size:14px;border-bottom:1px solid #E4E7EC;padding-bottom:4px;margin:20px 0 8px}
    .sub{color:#667085;margin:2px 0 8px}.item{margin-bottom:10px}span{color:#667085}ul{margin:4px 0 0 18px;padding:0}
  </style></head><body>
    <h1>${esc(c.nome)}</h1><div class="sub">${esc(c.titulo)}</div><div class="sub">${contato}</div>
    ${bloco('Objetivo', c.objetivo ? [`<p>${esc(c.objetivo)}</p>`] : [])}
    ${bloco('Formação acadêmica', formacoes)}
    ${bloco('Experiência profissional', experiencias)}
    ${bloco('Projetos', projetos)}
    ${bloco('Habilidades', c.habilidades.length ? [`<p>${esc(c.habilidades.map((h) => h.nome).join(', '))}</p>`] : [])}
    ${bloco('Idiomas', c.idiomas.length ? [`<p>${esc(c.idiomas.map((i) => `${i.idioma}: ${i.nivel ?? ''}`).join(' | '))}</p>`] : [])}
  </body></html>`;
}

export async function baixarCurriculo(c: Curriculo) {
  const { uri } = await Print.printToFileAsync({ html: html(c) });
  if (!(await Sharing.isAvailableAsync())) throw new Error('Compartilhamento indisponível neste dispositivo');
  await Sharing.shareAsync(uri, {
    mimeType: 'application/pdf',
    UTI: 'com.adobe.pdf',
    dialogTitle: `Currículo – ${c.nome}`,
  });
}
