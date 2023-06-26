from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from model import User
from database import collection_users
from fastapi.security import OAuth2PasswordBearer
from auth import create_access_token, decode_token
from datetime import datetime
from fastapi import Header

app = FastAPI()

origins = ["http://localhost:3000"]  # Add the origin of your frontend application here

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/authenticate")
async def authenticate_user(credentials: User):
    # Check if the user exists in the database
    user = await collection_users.find_one({"username": credentials.username})
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Check if the password matches
    if user["password"] != credentials.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Generate JWT token
    token = create_access_token(credentials.username)
        
    return {"access_token": token, "token_type": "bearer"}

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/authenticate")

async def get_token_authorization(authorization: str = Header(...)) -> str:
    try:
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            raise HTTPException(status_code=401, detail="Invalid authentication scheme")
        return token
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid authorization header")

@app.get("/check_session")
async def check_session(token: str = Depends(get_token_authorization)):
    payload = decode_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    expires = datetime.utcfromtimestamp(payload["exp"])
    current_time = datetime.utcnow()
    
    if current_time > expires:
        return {"message": "Session has expired"}
    else:
        return {"message": "Session is valid"}
    
@app.get("/get_current_user")
async def get_current_user(token: str = Depends(get_token_authorization)):
    payload = decode_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    username = payload["sub"]
    
    return {"username": username}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
