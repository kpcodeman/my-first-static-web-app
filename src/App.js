import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const App = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    try {
      const result = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4',
        messages: [{ role: 'user', content: input }],
      }, {
        headers: {
          'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
          'Content-Type': 'application/json',
        },
      });
      setResponse(result.data.choices[0].message.content);
    } catch (error) {
      console.error('Error fetching data from OpenAI API:', error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        OpenAI Chat
      </Typography>
      <TextField
        label="Enter your message"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Send
      </Button>
      {response && (
        <Box mt={4} p={2} border={1} borderRadius={4} borderColor="grey.400">
          <Typography variant="h6">Response:</Typography>
          <Typography>{response}</Typography>
        </Box>
      )}
    </Container>
  );
};

export default App;