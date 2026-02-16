# 🌍 Land Cover Classification System

This project is a deep learning-based Land Use and Land Cover (LULC) classification system. It features a professional React frontend for geographic exploration and a Flask backend for spectral analysis.

---

## 🚀 How to Run the Project

To activate the full system, you must run the **Backend** and **Frontend** in two separate terminals simultaneously.

### 1. 🐍 Start the Backend (Analysis Engine)
The backend handles the deep learning classification logic on port 5000.

1.  **Open Terminal 1** and navigate to the root directory.
2.  **Activate the Virtual Environment**:
    ```powershell
    # Windows
    .\.venv\Scripts\activate
    ```
3.  **Navigate to Backend**:
    ```bash
    cd backend
    ```
4.  **Install Requirements** (Only needed once):
    ```bash
    pip install -r requirements.txt
    ```
5.  **Run the Engine**:
    ```bash
    python app.py
    ```
    *Status: `MCNN Analysis Engine starting on port 5000...`*

### 2. ⚛️ Start the Frontend (User Interface)
The frontend provides the interactive map and dashboard on port 5173.

1.  **Open Terminal 2** and navigate to the frontend folder:
    ```bash
    cd frontend
    ```
2.  **Install Dependencies** (Only needed once):
    ```bash
    npm install
    ```
3.  **Launch the App**:
    ```bash
    npm run dev
    ```
    *Status: `Local: http://localhost:5173`*

---

## 🛠 Notable Features
- **Integrated Experience**: Seamless transitions from Uploaded Images to Results.
- **Academic Global Map**: India-centered (`Zoom: 5`) default view optimized for regional research.
- **Direct MCNN Analysis**: One-click pixel-wise classification of current view.
- **Statistical Breakdown**: Real-time distribution report with confidence scoring.
- **Enhanced Stability**: Resolved coordinate snapping and geolocation runtime glitches.

## 📁 Repository Structure
- `frontend/`: React + Vite application.
- `backend/app.py`: Main Flask entry point.
- `backend/routes/`: API endpoint definitions.
- `backend/ml/`: Modular ML pipeline (Preprocess, Inference, Masking).
- `backend/tiles/`: Storage for high-res `.tif` satellite data.
- `.venv/`: Python virtual environment.

---
*Developed by Antigravity AI for Chinnala Nithish.*
