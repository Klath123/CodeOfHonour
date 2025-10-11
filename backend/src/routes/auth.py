from fastapi import APIRouter, Response, BackgroundTasks, HTTPException
from src.utils.auth import register_user, authenticate_user, create_token
from src.models.auth import UserRegister, UserLogin
from src.config import Config

authRouter = APIRouter() 

@authRouter.post("/register")
def register(data: UserRegister, background_tasks: BackgroundTasks):
    return register_user(data, background_tasks)

@authRouter.post("/login")
async def login(data: UserLogin, response: Response):
    # Authenticate user credentials
    user_data = authenticate_user(data)
    
    # Extract token from authentication result
    token = user_data["token"]
    
    # Set authentication cookie
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=False,        # Set to True in production (with HTTPS)
        samesite="Strict",    # Adjust based on your CORS needs
        max_age=7 * 24 * 60 * 60,  # 7 days
        path="/"            # Ensures the cookie is sent to all endpoints
    )
    
    return {
        "success": True,
        "msg": "Login successful"
    }

@authRouter.post("/logout")
def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Logged out successfully"}

@authRouter.get("/debug-token")
async def debug_token():
    try:
        test_token = create_token({"sub": "test_user"})
        return {
            "success": True,
            "token_preview": test_token[:20] + "...",
            "config": {
                "has_secret": bool(Config.SECRET_KEY),
                "algorithm": Config.ALGORITHM,
                "expire_minutes": Config.ACCESS_TOKEN_EXPIRE_MINUTES
            }
        }
    except Exception as e:
        return {"error": str(e)}