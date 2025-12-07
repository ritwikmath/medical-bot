import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function ChatInput({ onSendMessage }) {
  const [inputValue, setInputValue] = useState('')

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue)
      setInputValue('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className='chat_input'>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          multiline
          maxRows={4}
        />
        <Button 
          variant="contained"
          color="primary" 
          onClick={handleSend}
          disabled={!inputValue.trim()}
        >
          Send
        </Button>
      </Box>
    </div>
  )
}

export default ChatInput