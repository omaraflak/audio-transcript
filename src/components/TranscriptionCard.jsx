import { Card, Text, Button, ScrollArea } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';

export default function TranscriptionCard({ transcription, loading }) {
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
        Transcription
      </Text>

      <ScrollArea h={200} mb="md">
        <Text>{transcription}</Text>
      </ScrollArea>

      <Button
        leftSection={<IconDownload size={16} />}
        onClick={handleDownload}
        disabled={loading}
      >
        Download Transcription
      </Button>
    </Card>
  );
} 