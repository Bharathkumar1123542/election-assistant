from fastapi import HTTPException, status


def require_api_key(api_key: str | None):
    if not api_key:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='API key required')


def validate_user_token(token: str | None):
    if not token or token != 'secure-token':
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid token')
