'use client';

import { Button, Container, Group, Text } from '@mantine/core';
import { IconDatabase } from '@tabler/icons-react';
import { PidComponent } from '../../lib';

interface FooterProps {
  darkMode?: boolean;
}

export function Footer({ darkMode = false }: FooterProps) {
  return (
    <div className={darkMode ? 'bg-gray-800' : 'bg-white'} style={{
      borderTop: darkMode ? '1px solid #4b5563' : '1px solid #e0e0e0',
      marginTop: 48,
    }}>
      <Container size="xl">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 0',
          gap: '16px',
        }}>
          <Group gap="sm">
            <Button
              variant="filled"
              color="indigo"
              size="xs"
              leftSection={<IconDatabase size={14} />}
              radius="md"
              className={darkMode ? 'text-white' : ''}
            >
              Lorem ipsum
            </Button>
          </Group>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Text size="sm" c={darkMode ? 'gray.4' : 'dimmed'} style={{ whiteSpace: 'nowrap' }}>Powered by</Text>
            <div style={{ flex: 1, minWidth: 0 }}>
              <PidComponent value="https://ror.org/04t3en479" emphasizeComponent={false} hideSubcomponents={true}
                            darkMode={darkMode ? 'dark' : 'light'} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
