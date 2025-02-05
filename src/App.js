import React, { useState } from 'react';

const OpenAIComponent = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://DeepSeek-R1-imqrm.eastus.models.ai.azure.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer XXXXXX`
        },
        body: JSON.stringify({
          prompt: input,
          max_tokens: 50
        })
      });
      const data = await res.json();
      setResponse(data.choices[0].text);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default OpenAIComponent;