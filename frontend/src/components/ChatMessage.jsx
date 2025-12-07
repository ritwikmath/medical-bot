import React from 'react'

function ChatMessage({ text, sender, isTyping = false }) {
  return (
    <div className={`chat_message ${sender === 'user' ? 'user_message' : 'bot_message'} ${isTyping ? 'typing' : ''}`}>
      <div className='message_bubble'>
        {text}
      </div>
    </div>
  )
}

export default ChatMessage