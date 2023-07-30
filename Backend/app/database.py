import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://mongo:27017')
database = client["users"]
collection_users = database["login"]
collection_bhajanamandiralu = database["bhajanadb"]
collection_reports = database["reportsdb"]
