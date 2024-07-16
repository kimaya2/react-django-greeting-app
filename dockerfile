# Stage 1: Build the frontend
FROM node:14 AS frontend

# Set the working directory
WORKDIR /app

# Copy frontend files
COPY react-django-app/package*.json ./
RUN npm install
COPY react-django-app/ ./
RUN npm run build

# Stage 2: Build the backend
FROM python:3.12 AS backend

# Set the working directory
WORKDIR /app

# Install dependencies
COPY backend/requirements.txt ./
RUN pip install -r requirements.txt
COPY backend/ ./

# Copy the frontend build to the backend static folder
COPY --from=frontend /app/build /app/static

# Collect static files
RUN python manage.py collectstatic --noinput

# Set environment variables
ENV PYTHONUNBUFFERED 1

# Expose the port
EXPOSE 8000

# Run the server
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backend.wsgi:application"]
