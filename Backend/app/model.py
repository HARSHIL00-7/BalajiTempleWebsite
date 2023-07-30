from pydantic import BaseModel, EmailStr, validator
from datetime import datetime,date
from typing import Optional
from email_validator import validate_email
from enum import Enum
from fastapi import  UploadFile

class UserRole(str, Enum):
    normal_user = "normal_user"
    admin = "admin"
    super_admin = "super_admin"
    agency = "agency"
    editor = "editor"
    viewer = "viewer"

class User(BaseModel):
    username: str
    created_at: Optional[datetime]
    email: Optional[EmailStr]
    password: Optional[str]
    @validator('email')
    def validate_email_address(cls, email):
        v = validate_email(email)
        return v.email
    phoneNumber: Optional[str]
    role: Optional[UserRole] = UserRole.normal_user

class BhajanaMandiraluData(BaseModel):
    username: Optional[str]
    created_at: Optional[datetime]
    phases: str
    district: str
    village: str
    Longitude: str
    name: str
    Phone: int
    land: str
    boundary: str
    earlier: str
    detailsvillage: str
    email: EmailStr
    recommendation: str
    assembly: str
    Colony: str
    Population: str
    Nametemple: str
    docfile:str
    landvests: str
    acceptance: str
    othertemples: str
    amount: str
    contactperson: str
    issues: str
    mandal: str
    latitude: str
    SCST: str
    emailadd: EmailStr
    purpose: str
    surveyn: int
    support: str
    nearbyvill: str
    contri: str
    phonenoofc: int
    comments: str
    



class reportsData(BaseModel):
    username: Optional[str]
    ReportFiled_at: Optional[datetime]
    district: str
    assemblyConstituency: str
    startDate: str
    mandal: str
    colony: str
    endDate: str
    panchayat: str
    referred: str
    locationColony: str
    ward: str
    phases:str


@validator('docfile')
def validate_docfile(cls, value):
        if value is not None and not isinstance(value, bytearray):
            raise ValueError('docfile must be a bytearray or None')
        return value