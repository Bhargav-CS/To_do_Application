from fastapi import APIRouter, HTTPException
from db import tasks_collection
from models import Task
from bson import ObjectId
import requests
import os

router = APIRouter()

AUTH0_DOMAIN = os.getenv("AUTH0_DOMAIN")
AUTH0_CLIENT_ID = os.getenv("AUTH0_CLIENT_ID")
AUTH0_CLIENT_SECRET = os.getenv("AUTH0_CLIENT_SECRET")
AUTH0_AUDIENCE = os.getenv("AUTH0_AUDIENCE")

@router.get("/tasks")
async def get_tasks():
    tasks = await tasks_collection.find().to_list(length=100)
    for task in tasks:
        task["_id"] = str(task["_id"])  # Convert ObjectId to string
    return tasks

@router.post("/tasks")
async def create_task(task: Task):
    result = await tasks_collection.insert_one(task.dict())
    return {"id": str(result.inserted_id)}

@router.put("/tasks/{task_id}")
async def update_task(task_id: str, task: Task):
    result = await tasks_collection.update_one({"_id": ObjectId(task_id)}, {"$set": task.dict()})
    if result.matched_count:
        return {"message": "Task updated"}
    raise HTTPException(status_code=404, detail="Task not found")

@router.delete("/tasks/{task_id}")
async def delete_task(task_id: str):
    result = await tasks_collection.delete_one({"_id": ObjectId(task_id)})
    if result.deleted_count:
        return {"message": "Task deleted"}
    raise HTTPException(status_code=404, detail="Task not found")

@router.post("/auth/login")
def login_user(data: dict):
    """Handles user login by securely requesting a token from Auth0."""
    auth_payload = {
        "grant_type": "password",
        "client_id": AUTH0_CLIENT_ID,
        "client_secret": AUTH0_CLIENT_SECRET,
        "audience": AUTH0_AUDIENCE,
        "username": data["email"],
        "password": data["password"],
        "scope": "openid profile email"
    }

    response = requests.post(f"https://{AUTH0_DOMAIN}/oauth/token", json=auth_payload)
    
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Invalid login credentials")
    
    return response.json()  # Send token back to frontend

@router.post("/auth/signup")
def signup_user(data: dict):
    """Handles user signup by securely creating a new user in Auth0."""
    signup_payload = {
        "client_id": AUTH0_CLIENT_ID,
        "email": data["email"],
        "password": data["password"],
        "connection": "Username-Password-Authentication"
    }

    response = requests.post(f"https://{AUTH0_DOMAIN}/dbconnections/signup", json=signup_payload)
    
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Signup failed")
    
    return response.json()  # Send response back to frontend
