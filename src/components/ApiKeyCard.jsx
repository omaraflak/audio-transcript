import { TextInput, Card, Text } from '@mantine/core';
import { IconKey } from '@tabler/icons-react';
import { useEffect } from 'react';

export default function ApiKeyCard({ apiKey, onApiKeyChange }) {
  useEffect(() => {
    const savedApiKey = localStorage.getItem('apiKey');
    if (savedApiKey) {
      onApiKeyChange(savedApiKey);
    }
  }, [onApiKeyChange]);

  const handleApiKeyChange = (value) => {
    onApiKeyChange(value);
    localStorage.setItem('apiKey', value);
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text size="lg" fw={500} mb="md">
        OpenAI API Key
      </Text>
      <TextInput
        placeholder="Enter your OpenAI API key"
        value={apiKey}
        onChange={(e) => handleApiKeyChange(e.target.value)}
        leftSection={<IconKey size={16} />}
        type="password"
      />
    </Card>
  );
} 