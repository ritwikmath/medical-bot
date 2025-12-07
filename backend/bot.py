import os
from langchain_openai import ChatOpenAI
from langchain.messages import HumanMessage, AIMessage, SystemMessage
from prompt import prompt
from db import MongoDB
from langchain_mongodb.chat_message_histories import MongoDBChatMessageHistory


class ChatBot:
    def __init__(self, chat_id):
        self.mongo_db = MongoDB()
        self.model = ChatOpenAI(model=os.getenv("OPEN_API_MODEL"), temperature=0.1)
        self.load_chat_history(chat_id)
    
    def load_chat_history(self, chat_id):
        self.chat_message_history = MongoDBChatMessageHistory(
            session_id = chat_id,               # Unique session identifier
            connection_string = self.mongo_db.get_uri(), # MongoDB cluster URI
            database_name = "test",         # Database to store the chat history
            collection_name = "test"      # Collection to store the chat history
        )

    def initialize_chat(self):
        self.chat_message_history.clear()
        self.chat_message_history.add_message(SystemMessage(prompt))
        
    def process_message(self, message):
        self.chat_message_history.add_user_message(message)
        
        response = ""
        
        for chunk in  self.model.stream(self.chat_message_history.messages):
            text = chunk.text
            yield text
            response += text
        
        self.chat_message_history.add_ai_message(response)
