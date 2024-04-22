#!/usr/bin/env bash

# Create a virtual environment
echo "Creating virtual environment..."
python3 -m venv venv

# Activate the virtual environment
source venv/bin/activate

# Install Django
echo "Installing Django..."
pip install django

pip install psycopg2-binary

# Install project dependencies
echo "Building project packages..."
pip install -r requirements.txt

# Run Django management commands
echo "Migrating Database..."
python manage.py makemigrations --noinput
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput

# Deactivate the virtual environment
deactivate
