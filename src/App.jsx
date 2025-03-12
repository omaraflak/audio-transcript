import { MantineProvider } from '@mantine/core';
import { Container } from '@mantine/core';
import TranscriptionPage from './pages/TranscriptionPage';
import '@mantine/core/styles.css';

function App() {
  return (
    <MantineProvider>
      <Container size="md" py="xl">
        <TranscriptionPage />
      </Container>
    </MantineProvider>
  );
}

export default App;
