FROM tiangolo/uvicorn-gunicorn-fastapi:python3.11-slim AS builder
COPY ./requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt
COPY ./app /app
WORKDIR /app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--root-path", "/api","--reload", "--proxy-headers"]