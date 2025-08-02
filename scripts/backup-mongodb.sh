#!/bin/bash

# MongoDB Backup Script for DevOps Traineeship Assignment
# This script creates timestamped backups using mongodump

# Configuration
MONGODB_HOST="localhost"
MONGODB_PORT="27017"
MONGODB_USER="admin"
MONGODB_PASS="password123"
MONGODB_DATABASE="risav"
BACKUP_DIR="/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_NAME="risav_backup_${TIMESTAMP}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if backup directory exists, create if not
if [ ! -d "$BACKUP_DIR" ]; then
    print_status "Creating backup directory: $BACKUP_DIR"
    mkdir -p "$BACKUP_DIR"
fi

# Check if mongodump is available
if ! command -v mongodump &> /dev/null; then
    print_error "mongodump is not installed or not in PATH"
    exit 1
fi

print_status "Starting MongoDB backup..."
print_status "Database: $MONGODB_DATABASE"
print_status "Backup name: $BACKUP_NAME"

# Create backup using mongodump
mongodump \
    --host="$MONGODB_HOST" \
    --port="$MONGODB_PORT" \
    --username="$MONGODB_USER" \
    --password="$MONGODB_PASS" \
    --authenticationDatabase="admin" \
    --db="$MONGODB_DATABASE" \
    --out="$BACKUP_DIR/$BACKUP_NAME" \
    --gzip

# Check if backup was successful
if [ $? -eq 0 ]; then
    print_status "Backup completed successfully!"
    print_status "Backup location: $BACKUP_DIR/$BACKUP_NAME"
    
    # Calculate backup size
    BACKUP_SIZE=$(du -sh "$BACKUP_DIR/$BACKUP_NAME" | cut -f1)
    print_status "Backup size: $BACKUP_SIZE"
    
    # List backup contents
    print_status "Backup contents:"
    ls -la "$BACKUP_DIR/$BACKUP_NAME"
    
    # Create a symlink to the latest backup
    cd "$BACKUP_DIR"
    ln -sf "$BACKUP_NAME" "latest"
    print_status "Latest backup symlink updated"
    
else
    print_error "Backup failed!"
    exit 1
fi

# Cleanup old backups (keep last 7 days)
print_status "Cleaning up old backups (keeping last 7 days)..."
find "$BACKUP_DIR" -name "risav_backup_*" -type d -mtime +7 -exec rm -rf {} \; 2>/dev/null

print_status "Backup process completed!" 