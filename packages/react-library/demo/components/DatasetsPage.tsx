'use client';

import { useState } from 'react';
import { Badge, Card, Table, Title } from '@mantine/core';
import { PidComponent } from '../../lib';

interface DatasetsPageProps {
}

export function DatasetsPage({}: DatasetsPageProps) {
  const [isActive] = useState(false);

  const headers = ['ID', 'Title', 'DOI', 'License'];
  const datasets = [
    {
      id: '1',
      title: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
      doi: 'doi:10.5445/IR/1000178054',
      license: 'https://spdx.org/licenses/MIT',
    },
    {
      id: '2',
      title: 'Sed do eiusmod tempor incididunt ut labore et dolore',
      doi: '10.52825/ocp.v5i.1411',
      license: 'CC-BY4.0',
    },
    {
      id: '3',
      title: 'Ut enim ad minim veniam quis nostrud exercitation',
      doi: 'https://doi.org/10.5281/zenodo.13629109',
      license: 'Apache-2.0',
    },
    {
      id: '4',
      title: 'An example Handle FDO with some nice contents',
      doi: '21.T11981/be908bd1-e049-4d35-975e-8e27d40117e6',
      license: 'CC-BY4.0',
    },
    {
      id: '5',
      title: 'An example of a very large record',
      doi: '21.T11981/5760c10e-6e64-41ea-824e-8dd4d3d2145d',
      license: 'CC-BY4.0',
    },
  ];

  return (
    <div style={{ marginBottom: 32 }}>
      <Title order={2} mb="md" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        Lorem ipsum dolor sit amet
        <Badge color={isActive ? 'green' : 'red'} variant="light" size="sm">
          {isActive ? 'Scanning Active' : 'Scanning Inactive'}
        </Badge>
      </Title>
      <Card shadow="sm" padding="xl" radius="md" withBorder>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              {headers.map(h => <Table.Th key={h}>{h}</Table.Th>)}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {datasets.map(item => (
              <Table.Tr key={item.id}>
                <Table.Td>{item.id}</Table.Td>
                <Table.Td>{item.title}</Table.Td>
                <Table.Td><PidComponent value={item.doi} openByDefault={false} /></Table.Td>
                <Table.Td><PidComponent value={item.license} openByDefault={false} /></Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
    </div>
  );
}
