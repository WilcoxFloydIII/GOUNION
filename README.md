# GoUnion

A social media platform built with Django.

## Setup

1.  Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

2.  **Supabase Configuration**:
    Edit the `.env` file and fill in your Supabase credentials.

    To use Supabase for **Storage** (Images):

    - Create a bucket named `gounion` (or whatever you set in `AWS_STORAGE_BUCKET_NAME`).
    - Get your S3 Access Keys from Supabase (Project Settings -> Storage -> S3 Access Keys).
    - Fill in `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_STORAGE_BUCKET_NAME`, and `AWS_S3_ENDPOINT_URL`.

3.  Run migrations:

    ```bash
    python manage.py migrate
    ```

4.  Run the server:
    ```bash
    python manage.py runserver
    ```

## Features

- **Authentication**: Sign up, Login, Logout.
- **Feed**: View posts from all users.
- **Posts**: Create posts with images and captions.
- **Profile**: View user profiles and their posts.
- **Storage**: Images are stored in Supabase (if configured) or locally.
