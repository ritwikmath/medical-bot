from dotenv import load_dotenv
from typing import Annotated
from fastapi import FastAPI, WebSocket, Query, WebSocketException, status
from fastapi.middleware.cors import CORSMiddleware
from bot import ChatBot
import traceback

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins= [
        "*",
        "http://localhost",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.websocket("/chat/{chat_id}")
async def conversation(
    *,
    websocket: WebSocket,
    session: Annotated[str | None, Query()] = None,
    chat_id: str
):
    
    await websocket.accept()
    
    if session is None:
        raise WebSocketException(code=status.WS_1008_POLICY_VIOLATION)
    
    try:
        bot = ChatBot(chat_id)
        bot.initialize_chat()
        # Continuous message loop
        while True:
            # Wait for incoming message
            data = await websocket.receive_text()
            
            # Process the message
            for response in bot.process_message(data):
                # Send response
                await websocket.send_text(response)
            
    except Exception as e:
        traceback.print_exc()
        print(f"Chat {chat_id} disconnected: {e}")