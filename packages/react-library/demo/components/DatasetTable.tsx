'use client';

import { useCallback, useRef } from 'react';
import { Button, Group, Paper, Table, Text } from '@mantine/core';
import { IconFileText } from '@tabler/icons-react';
import { PidComponent } from '../../lib';

interface Dataset {
  id: string;
  title: string;
  doi: string;
  license: string;
}

interface DatasetTableProps {
  datasets: Dataset[];
  darkMode?: boolean;
}

/** Minimal column-resize hook – drag the right edge of a <th> to resize. */
function useColumnResize() {
  const tableRef = useRef<HTMLTableElement>(null);

  const onMouseDown = useCallback((colIndex: number, e: React.MouseEvent) => {
    e.preventDefault();
    const table = tableRef.current;
    if (!table) return;
    const th = table.querySelectorAll('th')[colIndex] as HTMLTableCellElement;
    if (!th) return;

    const startX = e.clientX;
    const startWidth = th.offsetWidth;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = Math.max(60, startWidth + moveEvent.clientX - startX);
      th.style.width = `${newWidth}px`;
    };
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, []);

  return { tableRef, onMouseDown };
}

export function DatasetTable({ datasets, darkMode = false }: DatasetTableProps) {
  const { tableRef, onMouseDown } = useColumnResize();

  const headerBg = darkMode ? '#1f2937' : '#f8f9fa';
  const rowBg = darkMode ? '#1f2937' : '#ffffff';
  const textColor = darkMode ? '#9ca3af' : '#6b7280';
  const rowTextColor = darkMode ? '#ffffff' : '#1f2937';

  return (
    <Paper className={darkMode ? 'bg-gray-800' : 'bg-white'} shadow="sm" padding={0} radius="md" withBorder
           style={{ overflow: 'hidden' }}>
      <div style={{ padding: '20px 24px', borderBottom: darkMode ? '1px solid #4b5563' : '1px solid #e0e0e0' }}>
        <Group gap="xs">
          <IconFileText size={20} className={darkMode ? 'text-gray-400' : 'text-indigo-500'} />
          <Text fw={600} size="md" className={darkMode ? 'text-white' : 'text-gray-900'}>Related Datasets</Text>
        </Group>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <Table ref={tableRef} style={{ tableLayout: 'fixed', width: '100%' }}>
          <Table.Thead>
            <Table.Tr style={{ backgroundColor: headerBg }}>
              <Table.Th
                style={{
                  fontWeight: 600,
                  fontSize: 12,
                  textTransform: 'uppercase',
                  color: textColor,
                  position: 'relative',
                  overflow: 'hidden',
                  width: '30%',
                }}
              >
                Title
                <span
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: 5,
                    cursor: 'col-resize',
                    userSelect: 'none',
                  }}
                  onMouseDown={(e) => onMouseDown(0, e)}
                />
              </Table.Th>
              <Table.Th
                style={{
                  fontWeight: 600,
                  fontSize: 12,
                  textTransform: 'uppercase',
                  color: textColor,
                  position: 'relative',
                  overflow: 'hidden',
                  width: '30%',
                }}
              >
                DOI
                <span
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: 5,
                    cursor: 'col-resize',
                    userSelect: 'none',
                  }}
                  onMouseDown={(e) => onMouseDown(1, e)}
                />
              </Table.Th>
              <Table.Th
                style={{
                  fontWeight: 600,
                  fontSize: 12,
                  textTransform: 'uppercase',
                  color: textColor,
                  position: 'relative',
                  overflow: 'hidden',
                  width: '25%',
                }}
              >
                License
                <span
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: 5,
                    cursor: 'col-resize',
                    userSelect: 'none',
                  }}
                  onMouseDown={(e) => onMouseDown(2, e)}
                />
              </Table.Th>
              <Table.Th
                style={{
                  fontWeight: 600,
                  fontSize: 12,
                  textTransform: 'uppercase',
                  color: textColor,
                  width: '15%',
                }}
              >
                Actions
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {datasets.map((dataset) => (
              <Table.Tr key={dataset.id} style={{ backgroundColor: rowBg }}>
                <Table.Td style={{
                  fontSize: 14,
                  color: rowTextColor,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>{dataset.title}</Table.Td>
                <Table.Td style={{ overflow: 'hidden', minWidth: 0 }}>
                  <div style={{ minHeight: 24, maxHeight: 80, overflow: 'hidden' }}>
                    <PidComponent value={dataset.doi} emphasizeComponent={false} darkMode={darkMode ? 'dark' : 'light'}
                                  width="100%" />
                  </div>
                </Table.Td>
                <Table.Td style={{ overflow: 'hidden', minWidth: 0 }}>
                  <div style={{ minHeight: 24, maxHeight: 80, overflow: 'hidden' }}>
                    <PidComponent value={dataset.license} emphasizeComponent={false}
                                  darkMode={darkMode ? 'dark' : 'light'} width="100%" />
                  </div>
                </Table.Td>
                <Table.Td>
                  <Button variant="subtle" color="gray" size="xs">View</Button>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </Paper>
  );
}
