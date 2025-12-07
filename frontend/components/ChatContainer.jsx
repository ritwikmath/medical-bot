import React from 'react'
import ChatMessageContainer from './ChatMessageContainer'
import ChatInput from './ChatInput'

function ChatContainer() {
  return (
    <div className='chat_container'>
        <ChatMessageContainer />
        <ChatInput />
    </div>
  )
}

export default ChatContainer