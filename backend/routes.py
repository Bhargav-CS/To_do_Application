from fastapi import APIRouter, HTTPException
from db import tasks_collection
from models import Task
from bson import ObjectId

router = APIRouter()

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
