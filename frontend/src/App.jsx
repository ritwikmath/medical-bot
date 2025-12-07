import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ChatContainer from '../components/ChatContainer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ChatContainer />
    </>
  )
}

export default App
