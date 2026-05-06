import os
from fastapi import Request, HTTPException, Header
from jose import jwt
import requests

CLERK_ISSUER = os.getenv("CLERK_ISSUER")  


def get_public_keys():
    url = f"{CLERK_ISSUER}/.well-known/jwks.json"
    return requests.get(url).json()


async def get_current_user(req: Request):
    authorization = req.headers.get("Authorization")

    if not authorization:
        raise HTTPException(status_code=401, detail="Missing token")

    token = authorization.replace("Bearer ", "")

    try:
        jwks = get_public_keys()

        payload = jwt.decode(
            token,
            jwks,
            algorithms=["RS256"],
            audience=None,
            issuer=CLERK_ISSUER,
        )

        user_id = payload.get("sub")

        if not user_id:
            raise Exception("No user_id in token")

        # Fetch user from Clerk
        headers = {
            "Authorization": f"Bearer {os.getenv('CLERK_SECRET_KEY')}"
        }

        res = requests.get(
            f"https://api.clerk.dev/v1/users/{user_id}",
            headers=headers
        )

        if res.status_code != 200:
            raise Exception("Failed to fetch user from Clerk")

        user = res.json()

        # Extract role safely
        # You can store role in public_metadata in Clerk
        role = user.get("public_metadata", {}).get("role", "user")

        # Return normalized structure
        return {
            "user_id": user_id,
            "role": role
        }

    except Exception as e:
        print("TOKEN ERROR:", e)
        raise HTTPException(status_code=401, detail="Invalid token")

async def require_admin(user= None):
    role = user.get("public_metadata", {}).get("role")

    if role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")

    return user