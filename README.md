# Full-Stack To-Do List Application

## Project Structure
```
.
├── .gitignore
├── README.md
├── backend/
│   ├── .env
│   ├── app.py
│   ├── auth.py
│   ├── config.py
│   ├── db.py
│   ├── models.py
│   ├── requirements.txt
│   ├── routes.py
│   ├── test.py
│   └── pycache/
├── todo/
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── package.json
│   ├── README.md
│   ├── src/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── api/
│   │   │   └── tasks.js
│   │   ├── components/
│   │   │   ├── TaskForm.jsx
│   │   │   └── TaskList.jsx
│   │   ├── global/
│   │   │   └── styles.css
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   └── styles/
│   │       └── global.css
│   ├── vite.config.js
│   └── index.html
```

## Deployment
The application is deployed at: [https://to-do-application-jjti.onrender.com](https://to-do-application-jjti.onrender.com)

## Backend
The backend is built with FastAPI and MongoDB. It handles user authentication and task management.

### Setup

1. **Install dependencies**:
    ```sh
    pip install -r backend/requirements.txt
    ```

2. **Set up environment variables**:
    Create a `.env` file in the `backend` directory with the following content:
    ```env
    MONGO_URI=<your_mongo_uri>
    AUTH0_DOMAIN=<your_auth0_domain>
    AUTH0_AUDIENCE=<your_auth0_audience>
    AUTH0_CLIENT_ID=<your_auth0_client_id>
    AUTH0_CLIENT_SECRET=<your_auth0_client_secret>
    ```

3. **Run the backend server**:
    ```sh
    uvicorn backend.app:app --reload
    ```

## Frontend
The frontend is built with React and Vite. It provides a user interface for managing tasks.

### Setup

1. **Navigate to the frontend directory**:
    ```sh
    cd todo
    ```

2. **Install dependencies**:
    ```sh
    yarn install
    ```

3. **Run the development server**:
    ```sh
    yarn dev
    ```

## Usage
1. **Sign Up**: Create a new account.
2. **Log In**: Log in with your credentials.
3. **Manage Tasks**: Add, update, and delete tasks.

## License
This project is licensed under the MIT License.

