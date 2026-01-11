import mediapipe as mp 
import cv2
import numpy as np 
import sklearn
from sklearn.decomposition import PCA
mp_draw=mp.solutions.drawing_utils
mp_pose=mp.solutions.pose
pose=mp_pose.Pose(static_image_mode=True,smooth_landmarks=True,enable_segmentation=True,model_complexity=2,min_detection_confidence=0.5)



def process_and_save_video(input_path, output_path):
    cap = cv2.VideoCapture(input_path)
    
    # Get video properties for saving
    width  = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps    = cap.get(cv2.CAP_PROP_FPS)
    
    # Setup Video Writer
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))
    pose_sequence = []
    print(f"Processing: {input_path}...")
    while cap.isOpened():
        success, frame = cap.read()
        if not success: break
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(rgb_frame)
        if results.pose_landmarks:
            #  Draw the skeleton on the frame
            mp_draw.draw_landmarks(
                frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                mp_draw.DrawingSpec(color=(0, 255, 0), thickness=2, circle_radius=2),
                mp_draw.DrawingSpec(color=(0, 0, 255), thickness=2)
            )
            lms = np.array([[lm.x, lm.y, lm.z] for lm in results.pose_landmarks.landmark])
            # Translation: Hips (23, 24) as (0,0,0)
            hip_center = (lms[23] + lms[24]) / 2
            normalized = lms - hip_center
            # Scaling: Shoulder width (11, 12) as 1.0 unit
            scale = np.linalg.norm(lms[11] - lms[12])
            final_vector = (normalized / (scale if scale > 0 else 1.0)).flatten()
            pose_sequence.append(final_vector)
        out.write(frame)
    cap.release()
    out.release()
    print(f"Done! Annotated video saved to: {output_path}")
    return np.array(pose_sequence)


from fastdtw import fastdtw
from scipy.spatial.distance import euclidean




def calculate_score(user_matrix,expert_matrix):
    pca=PCA(n_components=10)
    expert_reduced=pca.fit_transform(expert_matrix)
    user_reduced=pca.fit_transform(user_matrix)

    distance,path=fastdtw(user_reduced,expert_reduced,dist=euclidean)
    avg_distance=distance/len(path)
    score=max(0,100-(avg_distance*25))
    return round(score,2)





