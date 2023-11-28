import datetime

from fastapi import APIRouter
from starlette import status
from starlette.responses import JSONResponse

from utils.db import add_logger_item, get_logger_items

router = APIRouter()

from fastapi import Request

@router.post("/", response_description="История обновлена")
async def add_logger_data(request: Request):
    item = await request.json()
    item['datetime'] = datetime.datetime.now()
    new_logger_item = await add_logger_item(item)
    if new_logger_item:
        return JSONResponse(status_code=status.HTTP_201_CREATED, content='Ok')
    return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content='Not ok')

@router.get('/')
async def get_logger_data():
    items = await get_logger_items()
    return items