import { useState } from 'react';
import { Card, Text, Button, Group } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { IconUpload, IconX, IconFileMusic, IconDownload } from '@tabler/icons-react';
import { transcribeAudio } from '../services/transcription';

export default function AudioUploadCard({
  apiKey,
  loading,
  setLoading
}) {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState('');

  const handleDrop = (files) => {
    setFile(files[0]);
  };

  const handleTranscribe = async () => {
    if (!file || !apiKey) return;

    setLoading(true);
    try {
      const text = await transcribeAudio(file, apiKey);
      setTranscription(text);
    } catch (error) {
      console.error('Transcription error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([transcription], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcription.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text size="lg" fw={500} mb="md">
        Upload Audio
      </Text>

      <Dropzone
        onDrop={handleDrop}
        accept={['audio/*']}
        maxSize={30 * 1024 ** 2}
      >
        <Group justify="center" gap="xl" style={{ minHeight: 100, pointerEvents: 'none' }}>
          <Dropzone.Accept>
            <IconUpload size={32} stroke={1.5} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX size={32} stroke={1.5} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconFileMusic size={32} stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag audio files here or click to select
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Files should not exceed 30MB
            </Text>
          </div>
        </Group>
      </Dropzone>

      {file && (
        <Text size="sm" mt="md">
          Selected file: {file.name}
        </Text>
      )}

      {file && (
        <Button
          fullWidth
          onClick={handleTranscribe}
          loading={loading}
          mt="md"
        >
          Transcribe Audio
        </Button>
      )}

      {transcription && (
        <Button
          fullWidth
          onClick={handleDownload}
          mt="md"
          color="green"
          leftSection={<IconDownload size={16} />}
        >
          Download Transcription
        </Button>
      )}
    </Card>
  );
} 