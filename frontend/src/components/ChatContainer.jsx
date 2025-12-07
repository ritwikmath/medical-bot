import React, { useState, useEffect, useRef } from 'react'
import ChatMessageContainer from './ChatMessageContainer'
import ChatInput from './ChatInput'

function ChatContainer() {
  const [messages, setMessages] = useState([])
  const [isWaitingForBot, setIsWaitingForBot] = useState(false)
  const wsRef = useRef(null)
  const isStreamingRef = useRef(false)

  useEffect(() => {
    // Connect to WebSocket
    const ws = new WebSocket('ws://127.0.0.1:8000/chat/abcd?session=abcgtd')
    wsRef.current = ws

    ws.onopen = () => {
      console.log('WebSocket connected')
    }

    ws.onmessage = (event) => {
      console.log('Received chunk:', event.data)
      setIsWaitingForBot(false)
      
      if (isStreamingRef.current) {
        // Append to the last message (streaming)
        setMessages(prev => {
          const newMessages = [...prev]
          const lastIndex = newMessages.length - 1
          if (lastIndex >= 0 && newMessages[lastIndex].sender === 'bot') {
            newMessages[lastIndex] = {
              ...newMessages[lastIndex],
              text: newMessages[lastIndex].text + event.data
            }
          }
          return newMessages
        })
      } else {
        // Start a new bot message
        isStreamingRef.current = true
        const botMessage = {
          text: event.data,
          sender: 'bot',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
      }
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
      setIsWaitingForBot(false)
      isStreamingRef.current = false
    }

    ws.onclose = (event) => {
      console.log('WebSocket disconnected', event.code, event.reason)
      isStreamingRef.current = false
    }

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close()
      }
    }
  }, [])

  const sendMessage = (text) => {
    if (!text.trim() || !wsRef.current) return

    // Add user message to chat
    const userMessage = {
      text: text,
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])

    // Send message via WebSocket
    if (wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(text)
      setIsWaitingForBot(true)
      isStreamingRef.current = false // Reset streaming flag for new message
    }
  }

  return (
    <div className='chat_container'>
      <ChatMessageContainer messages={messages} isWaitingForBot={isWaitingForBot} />
      <ChatInput onSendMessage={sendMessage} />
    </div>
  )
}

export default ChatContainer