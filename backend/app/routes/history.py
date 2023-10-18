import logging

from fastapi import APIRouter, Body, HTTPException, status
from fastapi.encoders import jsonable_encoder
from uvicorn.server import logger

from utils.db import add_history_item, retrieve_user, retrieve_user_by_name, retrieve_history_item_by_username, \
    delete_history_by_username_and_query
from utils.schema import HistorySchema, ResponseModel, ErrorResponseModel, ResponseHistoryModel, HistoryBaseSchema

router = APIRouter()


@router.post("/", response_description="История обновлена")
async def add_history_data(history_item: HistorySchema = Body(...)):
    history_item = jsonable_encoder(history_item)
    user = await retrieve_user_by_name(history_item['username'])
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Не найден пользователь. Проверьте правильность запроса.'
        )
    new_history_item = await add_history_item(history_item)
    return ResponseModel(new_history_item, 'ok')

@router.get("/{username}")
async def get_history_by_username(username: str):
    user = await retrieve_user_by_name(username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Не найден пользователь. Проверьте правильность запроса.'
        )
    history_items = await retrieve_history_item_by_username(username)
    if history_items:
        return ResponseHistoryModel(history_items, 'ok')
    return ResponseHistoryModel([], 'Записи в истории не найдены')

@router.post("/delete")
async def delete_history(params: HistoryBaseSchema = Body(...)):
    await delete_history_by_username_and_query(username=params.username, query=params.query)
    return ResponseModel({'details': 'Запрос из истории удален'}, 'Ok')