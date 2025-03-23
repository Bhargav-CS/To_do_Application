from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer
from jose import jwt
import requests
from config import AUTH0_DOMAIN, AUTH0_AUDIENCE

auth_scheme = HTTPBearer()

def get_auth_key():
    """Fetch Auth0 public keys for verifying JWT."""
    url = f"https://{AUTH0_DOMAIN}/.well-known/jwks.json"
    response = requests.get(url)
    return response.json()

def verify_token(token: str = Depends(auth_scheme)):
    """Verify JWT token from Auth0."""
    try:
        header = jwt.get_unverified_header(token.credentials)
        key_data = get_auth_key()

        rsa_key = {}
        for key in key_data["keys"]:
            if key["kid"] == header["kid"]:
                rsa_key = {
                    "kty": key["kty"],
                    "kid": key["kid"],
                    "use": key["use"],
                    "n": key["n"],
                    "e": key["e"]
                }

        if not rsa_key:
            raise HTTPException(status_code=401, detail="Invalid token")

        payload = jwt.decode(
            token.credentials,
            rsa_key,
            algorithms=["RS256"],
            audience=AUTH0_AUDIENCE,
            issuer=f"https://{AUTH0_DOMAIN}/"
        )

        return payload
    
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
