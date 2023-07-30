from fastapi.security import OAuth2PasswordBearer
from typing import Dict
from datetime import datetime
from fastapi import APIRouter, HTTPException, Depends
from app.model import User,BhajanaMandiraluData,reportsData
from app.database import collection_users,collection_bhajanamandiralu,collection_reports
from dateutil import tz
from app.auth.auth_handler import signJWT,verify_password,decodeJWT
import bcrypt
from bson import ObjectId
import pytz

active_sessions: Dict[str, datetime] = {}

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/authenticate")



@router.post("/bhajanmindralu")
async def save_bhajanmindralu_data(data: BhajanaMandiraluData ,token: str = Depends(oauth2_scheme)) :
    payload = decodeJWT(token)
    if payload is None or "exp" not in payload:
        raise HTTPException(status_code=401, detail="Invalid token or session has expired")

    username = payload["username"]
    created_at = datetime.now()
    data_dict = data.dict()
    data_dict["username"] = username
    data_dict["created_at"] = created_at

    result = collection_bhajanamandiralu.insert_one(data_dict)

    if result:
        return {"message": "Form data saved successfully"}
    else:
        raise HTTPException(status_code=500, detail="Failed to save form data")


@router.post("/signup")
async def signup_user(user: User):
    existing_username = await collection_users.find_one({"username": user.username})
    existing_email = await collection_users.find_one({"email": user.email})

    if existing_username:
        raise HTTPException(status_code=400, detail="Username already exists")
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already registered")
 
    
    hashed_password = bcrypt.hashpw(user.password.encode(), bcrypt.gensalt())
    
    new_user = {
        "username": user.username,
        "email": user.email,
        "password": hashed_password,
        "created_at": datetime.now(),
        "phoneNumber": user.phoneNumber,
        "role": "normal_user"
    }
    
    result = await collection_users.insert_one(new_user)
    if result:
        return {"message": "Signup successful"}
    else:
        raise HTTPException(status_code=500, detail="Failed to create user")


@router.post("/authenticate")
async def authenticate_user(credentials: User):
    if is_active_session(credentials.username):
        raise HTTPException(status_code=400, detail="User is already logged in from another device or browser")

    user = await collection_users.find_one({"username": credentials.username})
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(credentials.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid password or username, please check again")

    role = user["role"] 

    if is_active_session(user["username"]):
        raise HTTPException(status_code=400, detail="User is already logged in from another device or browser")


    active_sessions[user["username"]] = datetime.now()

    return signJWT(credentials.username,role) 

@router.get("/check_session")
async def check_session(token: str = Depends(oauth2_scheme)):
    payload = decodeJWT(token)

    if payload is None or "exp" not in payload:
        return {"message": "Session has expired"}

    expiration_time = payload["exp"]
    UTC = tz.gettz('UTC')  
    IST = tz.gettz('Asia/Kolkata') 
    current_time = datetime.now(tz=UTC).astimezone(IST)

    current_unix = int(current_time.timestamp())  
    time_difference = expiration_time - current_unix

    if time_difference <= 3:
        username = payload.get("username")
        if username:
            remove_active_session(username)
        return {"message": "Session has expired"}
    else:
        return {"message": "Session is valid"}


@router.get("/current_user")
async def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = decodeJWT(token)
    if payload is None or "exp" not in payload:
        raise HTTPException(status_code=401, detail="Invalid token or session has expired")


    username = payload["username"]
    return {"username": username}
    


@router.post("/reports")
async def save_report_data(data: reportsData,token: str = Depends(oauth2_scheme)):
    payload = decodeJWT(token)
    if payload is None or "exp" not in payload:
        raise HTTPException(status_code=401, detail="Invalid token or session has expired")
    
    username = payload["username"]
    tz = pytz.timezone("Asia/Kolkata")  # 
    ReportFiled_at = datetime.now(tz=tz)
    formatted_ReportFiled_at = ReportFiled_at.strftime("%Y-%m-%d %H:%M:%S")
    data_dict = data.dict()
    data_dict["username"] = username
    data_dict["ReportFiled_at"] = formatted_ReportFiled_at

    result = await collection_reports.insert_one(data_dict)

    if result:
        return {"message": "Report data saved successfully"}
    else:
        raise HTTPException(status_code=500, detail="Failed to save report data")




@router.post("/logout")
async def logout_user(token: str = Depends(oauth2_scheme)):
    payload = decodeJWT(token)
    if payload is None or "exp" not in payload:
        raise HTTPException(status_code=401, detail="Invalid token or session has expired")
    username = payload["username"]
    remove_active_session(username)
    return {"message": "Logout successful"}



def is_active_session(username: str) -> bool:

    return username in active_sessions


def remove_active_session(username: str):
    if username in active_sessions:
        del active_sessions[username]

@router.post("/check_username/{username}")
async def check_username_availability(username: str):
    existing_user = await collection_users.find_one({
        "username": username,
    })
    if existing_user:
        raise HTTPException(status_code=409, detail="Username already exists")
    
    available = not existing_user
    response = {"available": available}
    return response



@router.get("/reports/pdf")
async def get_report_data_pdf(token: str = Depends(oauth2_scheme)):

    payload = decodeJWT(token)
    if payload is None or "exp" not in payload:
        raise HTTPException(status_code=401, detail="Invalid token or session has expired")


    username = payload["username"]


    latest_report = await collection_reports.find_one(
        {"username": username},
        sort=[("$natural", -1)]  
    )
    if not latest_report:
        raise HTTPException(status_code=404, detail="No report data found for the user")


    latest_report.pop("_id", None)

    return latest_report

@router.get("/check_role")
async def check_user_role(token: str = Depends(oauth2_scheme)):

    payload = decodeJWT(token)
    if payload is None or "exp" not in payload:
        raise HTTPException(status_code=401, detail="Invalid token or session has expired")

    role = payload["role"]  

    return role

@router.get("/users")
async def get_users():
    users = await collection_users.find().to_list(length=None)
    filtered_users = []
    for user in users:
        filtered_user = {
            "user_id": str(user.get("_id")),  
            "username": user.get("username", ""),
            "email": user.get("email", ""),
            "phoneNumber": user.get("phoneNumber", ""),
            "role": user.get("role", "")
        }
        filtered_users.append(filtered_user)
    return filtered_users





@router.put("/users/{user_id}")
async def update_user(user_id: str, updated_user: User, token: str = Depends(oauth2_scheme)):

    payload = decodeJWT(token)
    if payload is None or "exp" not in payload:
        raise HTTPException(status_code=401, detail="Invalid token or session has expired")

    roles = payload["role"]
    if roles not in ["admin", "super_admin"]:
        raise HTTPException(status_code=403, detail="Insufficient privileges")

    user = await collection_users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")


    if updated_user.username and updated_user.username != user["username"]:
        existing_username = await collection_users.find_one({"username": updated_user.username})
        if existing_username:
            raise HTTPException(status_code=400, detail="Username already exists")

    update_data = {}
    if updated_user.username:
        update_data["username"] = updated_user.username
    if updated_user.email:
        update_data["email"] = updated_user.email
    if updated_user.phoneNumber:
        update_data["phoneNumber"] = updated_user.phoneNumber
    if updated_user.role:
        update_data["role"] = updated_user.role


    result = await collection_users.update_one({"_id": ObjectId(user_id)}, {"$set": update_data})
    if result.modified_count == 1:
        return {"message": "User updated successfully"}
    else:
        raise HTTPException(status_code=500, detail="Failed to update user")
    

@router.delete("/users/{user_id}")
async def delete_user(user_id: str, token: str = Depends(oauth2_scheme)):

    payload = decodeJWT(token)
    if payload is None or "exp" not in payload:
        raise HTTPException(status_code=401, detail="Invalid token or session has expired")


    role = payload["role"]
    if role not in ["admin", "super_admin"]:
        raise HTTPException(status_code=403, detail="Insufficient privileges")


    existing_user = await collection_users.find_one({"_id": ObjectId(user_id)})
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")


    await collection_users.delete_one({"_id": ObjectId(user_id)})

    return {"message": "User deleted successfully"}


@router.post("/users/add")
async def add_user(user: User, token: str = Depends(oauth2_scheme)):

    payload = decodeJWT(token)
    if payload is None or "exp" not in payload:
        raise HTTPException(status_code=401, detail="Invalid token or session has expired")



    roles = payload["role"]
    if roles not in ["admin", "super_admin"]:
        raise HTTPException(status_code=403, detail="Insufficient privileges")


    existing_username = await collection_users.find_one({"username": user.username})
    existing_email = await collection_users.find_one({"email": user.email})
    if existing_username:
        raise HTTPException(status_code=400, detail="Username already exists")
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already registered")


    hashed_password = bcrypt.hashpw(user.password.encode(), bcrypt.gensalt())
    tz = pytz.timezone("Asia/Kolkata") 

    new_user = {
        "username": user.username,
        "email": user.email,
        "password": hashed_password,
        "created_at": datetime.now(),
        "phoneNumber": user.phoneNumber,
        "role": user.role
    }


    result = await collection_users.insert_one(new_user)
    if result:
        return {"message": "User added successfully"}
    else:
        raise HTTPException(status_code=500, detail="Failed to add user")

