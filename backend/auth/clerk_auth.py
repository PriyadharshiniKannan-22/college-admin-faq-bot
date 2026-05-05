import os
import requests
from jose import jwt
from fastapi import HTTPException

CLERK_ISSUER = os.getenv("CLERK_ISSUER")  
JWKS_URL = f"{CLERK_ISSUER}/.well-known/jwks.json"


def get_jwks():
    return requests.get(JWKS_URL).json()


def verify_clerk_token(token: str):
    try:
        jwks = get_jwks()
        unverified_header = jwt.get_unverified_header(token)

        key = next(
            (k for k in jwks["keys"] if k["kid"] == unverified_header["kid"]),
            None,
        )

        if not key:
            raise HTTPException(status_code=401, detail="Invalid token")

        payload = jwt.decode(
            token,
            key,
            algorithms=["RS256"],
            audience=None,
            issuer=CLERK_ISSUER,
        )
        print("USER DATA:", payload)
        return payload

    except Exception as e:
        print("TOKEN ERROR:", e)
        raise HTTPException(status_code=401, detail="Invalid Clerk token")