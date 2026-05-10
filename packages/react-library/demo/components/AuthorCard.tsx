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
}

export function AuthorCard({ author }: AuthorCardProps) {
  const initials = author.name.split(' ').map(n => n[0]).join('');

  return (
    <Paper shadow="sm" padding="lg" radius="md" withBorder style={{ overflow: 'hidden' }}>
      <Group gap="md" align="flex-start">
        <Avatar size={48} radius="xl" color="indigo">
          {initials}
        </Avatar>
        <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
          <Text fw={600} size="sm"
                style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{author.name}</Text>
          <Text size="xs" c="dimmed">{author.role}</Text>
          {author.institution && (
            <Text size="xs" c="dimmed" style={{
              color: '#9ca3af',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>{author.institution}</Text>
          )}
          <div style={{ marginTop: 8, minHeight: 24, maxHeight: 80, overflow: 'hidden' }}>
            <PidComponent value={author.orcid} emphasizeComponent={false} width="100%" />
          </div>
        </Stack>
      </Group>
    </Paper>
  );
}

interface AuthorGridProps {
  authors: Author[];
}

export function AuthorGrid({ authors }: AuthorGridProps) {
  return (
    <div style={{ marginBottom: 32 }}>
      <Text fw={600} size="md" mb="md" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        Developers of the pid-component
      </Text>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {authors.map((author) => (
          <AuthorCard key={author.orcid} author={author} />
        ))}
      </div>
    </div>
  );
}
