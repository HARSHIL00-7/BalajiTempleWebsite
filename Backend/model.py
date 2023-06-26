from pydantic import BaseModel
from datetime import datetime

class User(BaseModel):
    username: str
    password: str


class BhajanaMandiraluData(BaseModel):
    title: str
    artist: str
    genre: str
    duration: int
    lyrics: str
