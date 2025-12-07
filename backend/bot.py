from typing import List, Dict
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.messages import HumanMessage, AIMessage, SystemMessage
from prompt import prompt

load_dotenv()

model = ChatOpenAI(model="gpt-5-nano-2025-08-07", temperature=0.1)

messages = {}

def process_message(chat_id, message):
    chat_messages: List = messages.get(chat_id, [])
    
    chat_messages.append(SystemMessage(prompt))
    chat_messages.append(HumanMessage(message))
    
    response = ""
    
    for chunk in  model.stream(chat_messages):
        text = chunk.text
        yield text
        response += text
    
    chat_messages.append(AIMessage(response))
    
    messages[chat_id] = chat_messages