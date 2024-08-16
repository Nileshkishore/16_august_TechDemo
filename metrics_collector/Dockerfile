FROM python:3.9-slim

# Set work directory
WORKDIR /app

# Install dependencies and clean up in one step
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Expose the required port
EXPOSE 7878

# Command to run the application
CMD ["python", "export-metrics.py"]

