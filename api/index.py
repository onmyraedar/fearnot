import requests

from fastapi import FastAPI

app = FastAPI()

@app.get("/api/python")
def hello_world():
    return {"message": "Hello World"}

@app.get("/api/image")
def get_image():
    url = 'https://f1af-72-80-0-127.ngrok-free.app/sdapi/v1/txt2img'
    payload = {
        "prompt": "a detailed puppy dog",
        "steps": 20,
        "height": 1024,
        "width": 1024
    }
    response = requests.post(url=url, json=payload)
    return response.json()
