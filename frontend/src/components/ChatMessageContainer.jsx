import React, { useEffect, useRef } from 'react'
import ChatMessage from './ChatMessage'

function ChatMessageContainer({ messages, isWaitingForBot }) {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isWaitingForBot])

  return (
    <div className='chat_message_container'>
      {messages.map((message, index) => (
        <ChatMessage 
          key={index} 
          text={message.text} 
          sender={message.sender}
        />
      ))}
      {isWaitingForBot && (
        <ChatMessage 
          text="Bot is replying..." 
          sender="bot"
          isTyping={true}
        />
      )}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default ChatMessageContainer