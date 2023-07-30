from datetime import datetime, timedelta
from dateutil import tz
import jwt
from decouple import config
import bcrypt


JWT_SECRET = config("SECRET_KEY")
JWT_ALGORITHM = config("ALGORITHM")
JWT_EXPIRE = int(config("ACCESS_TOKEN_EXPIRE_MINUTES"))


def token_response(token: str):
    return {
        "access_token": token,"token_type": "bearer"
    }

def signJWT(username: str,role: str) -> str:
  
    UTC = tz.gettz('UTC')  
    IST = tz.gettz('Asia/Kolkata')  

    expires_utc = datetime.utcnow() + timedelta(minutes=JWT_EXPIRE)
    expires_ist = expires_utc.replace(tzinfo=UTC).astimezone(IST)

    expires_unix = int(expires_ist.timestamp())  

    payload = {
        "username": username,
        "exp": expires_unix,
        "role": role  
    }

    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return token_response(token)


def decodeJWT(token: str) -> dict:
    try:
        decoded_token = jwt.decode(token, JWT_SECRET, algorithms=JWT_ALGORITHM)
        expires = decoded_token["exp"]
        role = decoded_token["role"]
        return {
            "username": decoded_token.get("username"),
            "exp": expires,
            "role": role  
        }
    except jwt.PyJWTError:
        return None

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode(), hashed_password)

