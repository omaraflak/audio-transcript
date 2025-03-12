import OpenAI from 'openai';

export async function transcribeAudio(file, apiKey) {
  const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

  try {
    const response = await openai.audio.transcriptions.create({
      file: file,
      model: 'whisper-1',
    });

    return response.text;
  } catch (error) {
    console.error('Error transcribing audio:', error);
    throw error;
  }
} 