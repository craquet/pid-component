'use client';

import { type ReactNode } from 'react';
import { createTheme, MantineProvider } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';

export const theme = createTheme({
  primaryColor: 'indigo',
  fontFamily: 'Inter, system-ui, sans-serif',
});

interface DemoProviderProps {
  children: ReactNode;
  darkMode: boolean;
  onDarkModeChange: (darkMode: boolean) => void;
}

function MantineThemeProvider({ children, darkMode, onDarkModeChange }: DemoProviderProps) {
  useHotkeys([['mod+J', () => onDarkModeChange(!darkMode)]]);

  return (
    <MantineProvider theme={theme} colorScheme={darkMode ? 'dark' : 'light'}>
      {children}
    </MantineProvider>
  );
}

export function DemoProvider({ children, darkMode, onDarkModeChange }: DemoProviderProps) {
  return (
    <MantineThemeProvider darkMode={darkMode} onDarkModeChange={onDarkModeChange}>
      {children}
    </MantineThemeProvider>
  );
}
