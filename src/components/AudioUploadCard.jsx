import { useState } from 'react';
import { Card, Text, Button, Group } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { IconUpload, IconX, IconFileMusic } from '@tabler/icons-react';
import { transcribeAudio } from '../services/transcription';

export default function AudioUploadCard({
  apiKey,
  onTranscriptionComplete,
  loading,
  setLoading
}) {
  const [file, setFile] = useState(null);

  const handleDrop = (files) => {
    setFile(files[0]);
  };

  const handleTranscribe = async () => {
    if (!file || !apiKey) return;

    setLoading(true);
    try {
      const text = await transcribeAudio(file, apiKey);
      onTranscriptionComplete(text);
    } catch (error) {
      console.error('Transcription error:', error);
    } finally {
      setLoading(false);
    }
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
    </Card>
  );
} 