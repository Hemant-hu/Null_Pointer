from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import shutil, os, numpy as np
from video import process_and_save_video, calculate_score

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


folders = ["expert_data/raw", "expert_data/matrices", "user_data/uploads", "processed_output"]
for f in folders: os.makedirs(f, exist_ok=True)

expert_db = {} 

@app.post("/dev/enroll")
async def enroll_expert(expert_id: str = Form(...), video: UploadFile = File(...)):
    # Save Raw
    raw_path = f"expert_data/raw/{expert_id}.mp4"
    processed_video = f"processed_output/expert_{expert_id}.mp4"
    matrix_path = f"expert_data/matrices/{expert_id}.npy"

    with open(raw_path, "wb") as buffer:
        shutil.copyfileobj(video.file, buffer)


    matrix = process_and_save_video(raw_path, processed_video)
    np.save(matrix_path, matrix)
    
    # Store in our dictionary
    expert_db[expert_id] = {"matrix": matrix_path, "video": processed_video}
    
    return {"status": "Expert enrolled", "id": expert_id, "skeleton_video": processed_video}

@app.post("/verify")
async def verify_skill(expert_id: str = Form(...), video: UploadFile = File(...)):
    exp_matrix_path = f"expert_data/matrices/{expert_id}.npy"
    if not os.path.exists(exp_matrix_path):
        raise HTTPException(status_code=404, detail="Expert ID not found")

    user_raw = f"user_data/uploads/{video.filename}"
    user_processed = f"processed_output/user_{video.filename}"
    
    with open(user_raw, "wb") as buffer:
        shutil.copyfileobj(video.file, buffer)

    # Process User Video & Get Score
    user_matrix = process_and_save_video(user_raw, user_processed)
    expert_matrix = np.load(exp_matrix_path)
    score = calculate_score(user_matrix, expert_matrix)

    return {
        "score": score,
        "grade": "Gold" if score > 85 else "Silver" if score > 70 else "Bronze",
        "videos": {
            "user_skeleton": f"/get-video/user_{video.filename}",
            "expert_skeleton": f"/get-video/expert_{expert_id}.mp4"
        }
    }

@app.get("/get-video/{filename}")
async def get_video(filename: str):
    return FileResponse(f"processed_output/{filename}")

if __name__ == "__main__":
    import uvicorn
   
    uvicorn.run(app, host="127.0.0.1", port=8000)