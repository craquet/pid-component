'use client';

import { Badge, Button, Group, Paper, Text, Title } from '@mantine/core';
import { IconDownload, IconExternalLink } from '@tabler/icons-react';
import { PidComponent } from '../../lib';
import type { ReactNode } from 'react';

interface HeroCardProps {
  title: string;
  description: string;
  doi?: string;
  actions?: ReactNode;
  darkMode?: boolean;
}

export function HeroCard({ title, description, doi, actions, darkMode = false }: HeroCardProps) {
  return (
    <Paper style={{ backgroundColor: darkMode ? '#1f2937' : '#ffffff' }} shadow="sm" padding="xl" radius="md"
           withBorder>
      <Group gap="xs" mb="md">
        <Badge color="blue" variant="light" size="sm">DOI</Badge>
        <Badge color="green" variant="light" size="sm">Research Data</Badge>
      </Group>
      <Title order={2} mb="sm" fw={700} className={darkMode ? 'text-white' : 'text-gray-900'}
             style={{ lineHeight: 1.3 }}>
        {title}
      </Title>
      <Text size="sm" c={darkMode ? 'gray.4' : 'dimmed'} mb="lg" style={{ lineHeight: 1.7 }}>
        {description}
      </Text>
      <Group gap="sm">
        {actions || (
          <>
            <Button color="indigo" leftSection={<IconDownload size={16} />}>
              Download Dataset
            </Button>
            <Button variant="outline" color={darkMode ? 'gray' : 'gray'} leftSection={<IconExternalLink size={16} />}
                    className={darkMode ? 'text-white border-gray-600' : ''}>
              View Source
            </Button>
          </>
        )}
      </Group>
    </Paper>
  );
}

interface DoiCardProps {
  value: string;
  license?: string;
  darkMode?: boolean;
}

export function DoiCard({ value, license, darkMode = false }: DoiCardProps) {
  return (
    <Paper style={{ backgroundColor: darkMode ? '#1f2937' : '#ffffff', overflow: 'hidden' }} shadow="sm" padding="lg"
           radius="md" withBorder>
      <Text size="xs" fw={600} c={darkMode ? 'gray.4' : 'dimmed'} mb="xs" tt="uppercase" style={{ letterSpacing: 1 }}>
        Digital Object Identifier
      </Text>
      <div style={{ minHeight: 120, maxHeight: 300, overflow: 'hidden' }}>
        <PidComponent value={value} darkMode={darkMode ? 'dark' : 'light'} width="100%" />
      </div>
      {license && (
        <>
          <div
            style={{ borderTop: darkMode ? '1px solid #4b5563' : '1px solid #e0e0e0', marginTop: 16, paddingTop: 16 }}>
            <Text size="xs" fw={600} c={darkMode ? 'gray.4' : 'dimmed'} mb="xs" tt="uppercase"
                  style={{ letterSpacing: 1 }}>
              License
            </Text>
            <div style={{ minHeight: 80, maxHeight: 200, overflow: 'hidden' }}>
              <PidComponent value={license} darkMode={darkMode ? 'dark' : 'light'} width="100%" />
            </div>
          </div>
        </>
      )}
    </Paper>
  );
}
