import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')
database = client["users"]
collection_users = database["login"]
collection_bhajanamandiralu=database["bhajanadb"]
