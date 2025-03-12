import { TextInput, Card, Text } from '@mantine/core';
import { IconKey } from '@tabler/icons-react';

export default function ApiKeyCard({ apiKey, onApiKeyChange }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text size="lg" fw={500} mb="md">
        OpenAI API Key
      </Text>
      <TextInput
        placeholder="Enter your OpenAI API key"
        value={apiKey}
        onChange={(e) => onApiKeyChange(e.target.value)}
        leftSection={<IconKey size={16} />}
        type="password"
      />
    </Card>
  );
} 