# Currículo App

App em React Native + Expo (SDK 58) + Expo Router + TypeScript. Busca os dados na Currículo API.

## Rodar

```bash
npm install
cp .env.example .env                 # EXPO_PUBLIC_API_URL com a URL da API
npx expo start                       # escaneie o QR Code com o Expo Go
```


## Telas (`src/app`)

`index` (Início) · `sobre` · `academica` · `profissional` · `projetos`

Funcionalidade extra: download do currículo em PDF (`src/lib/pdf.ts`).
