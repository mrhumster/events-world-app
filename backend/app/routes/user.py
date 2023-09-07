from datetime import datetime, timezone, timedelta

from fastapi import APIRouter, Body, Depends, HTTPException, status
from fastapi.encoders import jsonable_encoder
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
from passlib.context import CryptContext
from typing import Optional

from authorisation.auth import authenticate_user, create_access_token, create_password_hash
from utils.db import add_user, delete_user, retrieve_user, retrieve_users, update_user, get_user
from utils.environment import Config

from utils.schema import ErrorResponseModel, ResponseModel, UserSchema, UpdateUserModel, TokenData, User, Token, \
    UserRegister

router = APIRouter()


@router.post("/", response_description="Новый пользователь добавлен в базу")
async def add_user_data(user: UserSchema = Body(...)):
    user = jsonable_encoder(user)
    new_user = await add_user(user)
    return ResponseModel(new_user, "Пользователь добавлен")

@router.get("/", response_description="Пользователи")
async def get_users():
    users = await retrieve_users()
    if users:
        return ResponseModel(users, 'Пользователи успешно доставлены')
    return ResponseModel(users, 'Пустой список')

@router.get("/{id}", response_description='Пользователь')
async def get_user_data(id):
    user = await retrieve_user(id)
    if user:
        return ResponseModel(user, 'Пользователь успешно доставлен')
    return ErrorResponseModel('Ошибка', 404, 'Пользователь не существует')

@router.put("/{id}")
async def update_student_data(id: str, req: UpdateUserModel = Body(...)):
    req = {k: v for k, v in req.dict().items() if v is not None}
    updated_student = await update_user(id, req)
    if updated_student:
        return ResponseModel(
            {"detail": f"User with ID: {id} name update is successful"},
            "User name updated successfully",
        )
    return ErrorResponseModel(
        "An error occurred",
        404,
        "There was an error updating the student data.",
    )


@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)
    print('*** ***', user)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Пользователь не авторизован',
            headers={"WWW-Authenticate": "Bearer"}
        )
    access_token_expires = timedelta(minutes=Config.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user['username']}, expires_delta=access_token_expires
    )
    return {"access": access_token, "refresh": "Sorry, this method not implement", "user": user, "token_type": "bearer"}

@router.post("/create", response_model=Token)
async def create_user(register_form: UserRegister):
    print(register_form)
    attributes = {
        'username': register_form.username,
        'hashed_password': create_password_hash(register_form.password),
        'joined': str(datetime.now(timezone.utc)),
        'email': register_form.email,
    }

    check_users = await get_user(attributes['username'])

    if check_users:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail={
                'error': f'Operation not permitted, user with username {register_form.username} already exists.'
            },
            headers={'WWW-Authenticate': 'Bearer'}
        )

    user_data = await add_user(attributes)

    user = await authenticate_user(register_form.username, register_form.password)

    access_token_expires = timedelta(minutes=Config.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user['username']}, expires_delta=access_token_expires
    )
    return {"access": access_token, "refresh": "Sorry, this method not implement", "user": user, "token_type": "bearer"}