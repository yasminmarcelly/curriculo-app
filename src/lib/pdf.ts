import { Linking } from 'react-native';
import { API_URL } from './api';
import type { Curriculo } from './types';

/** O PDF é gerado pela API; o celular baixa o arquivo ao abrir o endereço. */
export function baixarCurriculo(c: Curriculo) {
  return Linking.openURL(`${API_URL}/pessoas/${c.id}/curriculo.pdf`);
}
