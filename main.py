from fastapi import FastAPI, HTTPException
from pymongo import MongoClient
from bson import ObjectId
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# MongoDB Connection
MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://your_mongo_connection_string")
client = MongoClient(MONGO_URI)
db = client["todo_db"]
tasks_collection = db["tasks"]

# Task Model
class Task:
    def __init__(self, title: str, completed: bool = False):
        self.title = title
        self.completed = completed

# Routes
@app.get("/tasks")
async def get_tasks():
    tasks = list(tasks_collection.find())
    return [{"id": str(task["_id"]), "title": task["title"], "completed": task["completed"]} for task in tasks]

@app.post("/tasks")
async def create_task(task: Task):
    result = tasks_collection.insert_one(task.__dict__)
    return {"id": str(result.inserted_id), "title": task.title, "completed": task.completed}

@app.put("/tasks/{task_id}")
async def update_task(task_id: str, task: Task):
    result = tasks_collection.update_one({"_id": ObjectId(task_id)}, {"$set": task.__dict__})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task updated successfully"}

@app.delete("/tasks/{task_id}")
async def delete_task(task_id: str):
    result = tasks_collection.delete_one({"_id": ObjectId(task_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted successfully"}
