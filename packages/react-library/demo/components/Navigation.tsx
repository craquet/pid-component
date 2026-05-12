'use client';

import { ActionIcon, Anchor, Badge, Button, Container, Group } from '@mantine/core';
import { IconDatabase, IconMoon, IconSun } from '@tabler/icons-react';

interface NavigationProps {
  activePage?: string;
  onNavigate?: (page: string) => void;
  darkMode?: boolean;
  onDarkModeChange?: (darkMode: boolean) => void;
}

export function Navigation({ activePage = 'home', onNavigate, darkMode = false, onDarkModeChange }: NavigationProps) {
  return (
    <div
      className={`sticky top-0 z-50 border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <Container size="xl">
        <Group justify="space-between" h={64}>
          <Group gap="sm">
            <Button
              variant="filled"
              color="indigo"
              size="sm"
              leftSection={<IconDatabase size={18} />}
              radius="md"
              className={darkMode ? 'text-white' : ''}
            >
              Lorem ipsum
            </Button>
            <Badge color="orange" variant="light" size="sm"
                   className={darkMode ? 'bg-orange-600 text-white' : 'bg-orange-100 text-orange-800'}>Demo</Badge>
          </Group>
          <Group gap="md">
            <Anchor
              component="button"
              type="button"
              onClick={() => onNavigate?.('home')}
              className={darkMode ? (activePage === 'home' ? 'text-white' : 'text-gray-400') : (activePage === 'home' ? 'text-indigo-600' : 'text-gray-600')}
              fw={activePage === 'home' ? 600 : 400}
              underline="never"
            >
              Home
            </Anchor>
            <Anchor
              component="button"
              type="button"
              onClick={() => onNavigate?.('datasets')}
              className={darkMode ? (activePage === 'datasets' ? 'text-white' : 'text-gray-400') : (activePage === 'datasets' ? 'text-indigo-600' : 'text-gray-600')}
              fw={activePage === 'datasets' ? 600 : 400}
              underline="never"
            >
              Datasets
            </Anchor>
            <Anchor
              component="button"
              type="button"
              onClick={() => onNavigate?.('about')}
              className={darkMode ? (activePage === 'about' ? 'text-white' : 'text-gray-400') : (activePage === 'about' ? 'text-indigo-600' : 'text-gray-600')}
              fw={activePage === 'about' ? 600 : 400}
              underline="never"
            >
              About
            </Anchor>
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={() => onDarkModeChange?.(!darkMode)}
              size="lg"
              className={darkMode ? 'text-yellow-400' : 'text-gray-600'}
            >
              {darkMode ? <IconSun size={20} /> : <IconMoon size={20} />}
            </ActionIcon>
          </Group>
        </Group>
      </Container>
    </div>
  );
}
