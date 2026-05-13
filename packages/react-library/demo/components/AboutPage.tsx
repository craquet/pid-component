'use client';

import { Badge, Card, Tabs, Text, Title } from '@mantine/core';
import { PidComponent } from '../../lib';

interface AboutPageProps {
  darkMode?: boolean;
}

export function AboutPage({ darkMode = false }: AboutPageProps) {
  return (
    <div style={{ marginBottom: 32 }}>
      <Title order={2} mb="md" className={darkMode ? 'text-white' : 'text-gray-900'}
             style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        About ResearchDemo
        <Badge color="blue" variant="light" size="sm">Demo Application</Badge>
      </Title>
      <Card style={{ backgroundColor: darkMode ? '#1f2937' : '#ffffff' }} shadow="sm" padding="xl" radius="md"
            withBorder>
        <Text size="sm" className={darkMode ? 'text-gray-300' : 'text-gray-700'}
              style={{ lineHeight: 1.8, marginBottom: 16 }}>
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Click the &quot;View License&quot; button below to see
          how a
          license can be rendered. Demo showcases pid-component integration with Next.js App Router, demonstrating
          seamless display of persistent identifiers including DOIs (e.g. 10.5281/zenodo.13629109), ORCIDs (e.g.
          0009-0005-2800-4833), ROR IDs (e.g. https://ror.org/04t3en479), Handle PIDs (e.g.
          21.T11981/be908bd1-e049-4d35-975e-8e27d40117e6), and SPDX license references.
        </Text>
        <Text size="sm" className={darkMode ? 'text-gray-300' : 'text-gray-700'}
              style={{ lineHeight: 1.8, marginBottom: 16 }}>
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Portal uses
          <strong> pid-component</strong> to render various PID types with automatic detection
          and resolution from respective registries.
        </Text>

        <Tabs defaultValue="dois">
          <Tabs.List>
            <Tabs.Tab value="dois" className={darkMode ? 'text-white' : ''}>DOIs</Tabs.Tab>
            <Tabs.Tab value="orcids" className={darkMode ? 'text-white' : ''}>ORCIDs</Tabs.Tab>
            <Tabs.Tab value="handles" className={darkMode ? 'text-white' : ''}>Handles</Tabs.Tab>
            <Tabs.Tab value="rors" className={darkMode ? 'text-white' : ''}>RORs</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="dois" pt="md">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '16px 0' }}>
              <PidComponent value="10.5281/zenodo.13629109" darkMode={darkMode ? 'dark' : 'light'} />
              <PidComponent value="doi:10.5445/IR/1000178054" darkMode={darkMode ? 'dark' : 'light'} />
              <PidComponent value="10.52825/ocp.v5i.1411" darkMode={darkMode ? 'dark' : 'light'} />
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="orcids" pt="md">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '16px 0' }}>
              <PidComponent value="0009-0005-2800-4833" darkMode={darkMode ? 'dark' : 'light'} />
              <PidComponent value="0000-0001-6575-1022" darkMode={darkMode ? 'dark' : 'light'} />
              <PidComponent value="0009-0003-2196-9187" darkMode={darkMode ? 'dark' : 'light'} />
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="handles" pt="md">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '16px 0' }}>
              <PidComponent value="21.T11981/be908bd1-e049-4d35-975e-8e27d40117e6"
                            darkMode={darkMode ? 'dark' : 'light'} />
              <PidComponent value="20.1000/100" darkMode={darkMode ? 'dark' : 'light'} />
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="rors" pt="md">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '16px 0' }}>
              <PidComponent value="https://ror.org/04t3en479" darkMode={darkMode ? 'dark' : 'light'} />
              <PidComponent value="https://spdx.org/licenses/MIT" darkMode={darkMode ? 'dark' : 'light'} />
            </div>
          </Tabs.Panel>
        </Tabs>
      </Card>
    </div>
  );
}
