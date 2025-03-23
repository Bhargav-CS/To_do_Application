from fastapi import FastAPI
from routes import router
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(router)

# Serve the static files from the frontend build
app.mount("/", StaticFiles(directory=os.path.join(os.path.dirname(__file__), "../todo/dist"), html=True), name="static")

@app.get("/")
def root():
    return {"message": "Todo API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
