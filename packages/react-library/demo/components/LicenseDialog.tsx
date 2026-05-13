'use client';

import { Button, Group, Modal, Paper, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconScale } from '@tabler/icons-react';
import { PidComponent } from '../../lib';

interface LicenseDialogProps {
  darkMode?: boolean;
}

export function LicenseDialog({ darkMode = false }: LicenseDialogProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Paper shadow="sm" padding="xl" radius="md" withBorder
             style={{
               backgroundColor: darkMode ? '#1f2937' : '#ffffff',
               borderColor: darkMode ? '#374151' : '#e5e7eb',
             }}>
        <Text fw={600} size="md" mb="md" style={{ display: 'flex', alignItems: 'center', gap: 8 }}
              className={darkMode ? 'text-white' : 'text-gray-900'}>
          <IconScale size={20} />
          License Information
        </Text>
        <Button onClick={open} color="indigo" leftSection={<IconScale size={16} />}>
          View License Details
        </Button>
      </Paper>

      <Modal
        opened={opened}
        onClose={close}
        title="Apache License 2.0"
        centered
        size="md"
        styles={{
          content: { backgroundColor: darkMode ? '#1f2937' : '#ffffff' },
          header: { backgroundColor: darkMode ? '#1f2937' : '#ffffff' },
          body: { backgroundColor: darkMode ? '#1f2937' : '#ffffff' },
        }}
      >
        <Text size="sm" c="dimmed" mb="md" className={darkMode ? 'text-gray-300' : ''}>
          This dataset is published under the Apache 2.0 license, allowing free reuse
          with appropriate attribution.
        </Text>
        <div style={{ minHeight: 150, maxHeight: 400, overflow: 'hidden' }}>
          <PidComponent value="https://spdx.org/licenses/Apache-2.0" darkMode={darkMode ? 'dark' : 'light'}
                        width="100%" />
        </div>
        <Group justify="flex-end" mt="xl">
          <Button variant="outline" color="gray" onClick={close}>
            Close
          </Button>
        </Group>
      </Modal>
    </>
  );
}
