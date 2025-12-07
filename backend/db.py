import os
import urllib
import pymongo

class MongoDB:
    def __init__(self):
        self.host = os.getenv('MONGO_HOST')
        self.port = os.getenv('MONGO_PORT')
        self.username = os.getenv('MONGO_USER')
        self.password = os.getenv('MONGO_PASSWORD')
        self.mongo_client = None
    
    def client(self):
        uri = f"mongodb://{self.username}:{self.password}@{self.host}:{self.port}"
        self.mongo_client = pymongo.MongoClient(uri)
        return self
    
    def database(self, db_name = 'test'):
        return self.mongo_client[db_name]
    
    def get_uri(self):
        return f"mongodb://{self.username}:{self.password}@{self.host}:{self.port}" 