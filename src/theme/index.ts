export const colors = {
  bg: '#FFFFFF',
  surface: '#F4F5F7',
  ink: '#1F2430',
  muted: '#667085',
  line: '#E4E7EC',
  accent: '#2F5BEA',
  accentSoft: '#E8EEFF',
  danger: '#B42318',
};

export const fonts = {
  display: 'Calistoga_400Regular',
  body: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  bold: 'Inter_700Bold',
};

export const space = { xs: 4, sm: 8, md: 16, lg: 24, xl: 40 };

export const type = {
  title: { fontFamily: fonts.display, fontSize: 34, lineHeight: 40, color: colors.ink },
  heading: { fontFamily: fonts.display, fontSize: 22, lineHeight: 28, color: colors.ink },
  item: { fontFamily: fonts.bold, fontSize: 16, lineHeight: 22, color: colors.ink },
  body: { fontFamily: fonts.body, fontSize: 15, lineHeight: 23, color: colors.ink },
  small: { fontFamily: fonts.body, fontSize: 13, lineHeight: 18, color: colors.muted },
} as const;
