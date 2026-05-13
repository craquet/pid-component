'use client';

import { Avatar, Group, Paper, Stack, Text } from '@mantine/core';
import { PidComponent } from '../../lib';

interface Author {
  orcid: string;
  name: string;
  role?: string;
  institution?: string;
}

interface AuthorCardProps {
  author: Author;
  darkMode?: boolean;
}

export function AuthorCard({ author, darkMode = false }: AuthorCardProps) {
  const initials = author.name.split(' ').map(n => n[0]).join('');

  return (
    <Paper style={{ backgroundColor: darkMode ? '#1f2937' : '#ffffff', overflow: 'hidden' }} shadow="sm" padding="lg"
           radius="md" withBorder>
      <Group gap="md" align="flex-start">
        <Avatar size={48} radius="xl" color="indigo" className={darkMode ? 'bg-indigo-700' : ''}>
          {initials}
        </Avatar>
        <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
          <Text fw={600} size="sm" className={darkMode ? 'text-white' : 'text-gray-900'}
                style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{author.name}</Text>
          <Text size="xs" c={darkMode ? 'gray.5' : 'dimmed'}>{author.role}</Text>
          {author.institution && (
            <Text size="xs" c={darkMode ? 'gray.5' : 'dimmed'} style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>{author.institution}</Text>
          )}
          <div style={{ marginTop: 8, minHeight: 24, maxHeight: 80, overflow: 'hidden' }}>
            <PidComponent value={author.orcid} emphasizeComponent={false} darkMode={darkMode ? 'dark' : 'light'}
                          width="100%" />
          </div>
        </Stack>
      </Group>
    </Paper>
  );
}

interface AuthorGridProps {
  authors: Author[];
  darkMode?: boolean;
}

export function AuthorGrid({ authors, darkMode = false }: AuthorGridProps) {
  return (
    <div style={{ marginBottom: 32 }}>
      <Text fw={600} size="md" mb="md" className={darkMode ? 'text-white' : 'text-gray-900'}
            style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        Lorem ipsum dolor sit amet
      </Text>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {authors.map((author) => (
          <AuthorCard key={author.orcid} author={author} darkMode={darkMode} />
        ))}
      </div>
    </div>
  );
}
