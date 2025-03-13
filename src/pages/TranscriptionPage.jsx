import { useState, useEffect } from 'react';
import { Stack, Center, Title } from '@mantine/core';
import ApiKeyCard from '../components/ApiKeyCard';
import AudioUploadCard from '../components/AudioUploadCard';

export default function TranscriptionPage() {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);

  // Load the API key from localStorage when the component mounts
  useEffect(() => {
    const savedApiKey = localStorage.getItem('apiKey');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  return (
    <Stack style={{ height: '100vh' }}>
      <Title align="center" mb="md">
        Audio Transcriber
      </Title>
      <Center style={{ height: '50%' }}>
        <Stack>
          <ApiKeyCard
            apiKey={apiKey}
            onApiKeyChange={setApiKey}
          />
          <AudioUploadCard
            apiKey={apiKey}
            loading={loading}
            setLoading={setLoading}
          />
        </Stack>
      </Center>
    </Stack>
  );
} 