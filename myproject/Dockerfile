# Step 1: Build stage
FROM python:3.11-alpine AS builder

# Install build dependencies
RUN apk add --no-cache \
    build-base \
    gcc \
    musl-dev

# Set work directory
WORKDIR /app

# Copy requirements file and install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Step 2: Final stage
FROM python:3.11-alpine

# Set work directory
WORKDIR /app

# Copy installed packages from build stage
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages

# Copy application files
COPY . /app/

# Expose the port
EXPOSE 8000

# Run database migrations and start the application
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]

