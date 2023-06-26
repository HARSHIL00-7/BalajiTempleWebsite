from pydantic import BaseModel


class User(BaseModel):
    username: str
    password: str


class BhajanaMandiraluData(BaseModel):
    title: str
    artist: str
    genre: str
    duration: int
    lyrics: str
