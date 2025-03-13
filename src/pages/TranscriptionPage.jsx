import { useState, useEffect } from 'react';
import { Stack, Center } from '@mantine/core';
import ApiKeyCard from '../components/ApiKeyCard';
import AudioUploadCard from '../components/AudioUploadCard';
import TranscriptionCard from '../components/TranscriptionCard';

export default function TranscriptionPage() {
  const [apiKey, setApiKey] = useState('');
  const [transcription, setTranscription] = useState('');
  const [loading, setLoading] = useState(false);

  // Load the API key from localStorage when the component mounts
  useEffect(() => {
    const savedApiKey = localStorage.getItem('apiKey');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  return (
    <Center style={{ height: '100vh' }}>
      <Stack>
        <ApiKeyCard
          apiKey={apiKey}
          onApiKeyChange={setApiKey}
        />
        <AudioUploadCard
          apiKey={apiKey}
          onTranscriptionComplete={setTranscription}
          loading={loading}
          setLoading={setLoading}
        />
        {transcription && (
          <TranscriptionCard
            transcription={transcription}
            loading={loading}
          />
        )}
      </Stack>
    </Center>
  );
} 