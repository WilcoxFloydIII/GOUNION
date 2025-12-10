# GoUnion Project Tasks

## ✅ Completed Features

- **Authentication System**
  - [x] Sign Up & Login
  - [x] Logout
  - [x] Error handling for login failures
- **Profile System**
  - [x] Automatic profile creation
  - [x] Profile editing (Bio, Profile Picture, University)
  - [x] Profile Types (Friend System vs Follower System)
- **Social Interactions**
  - [x] Create Posts (Image + Caption)
  - [x] Like & Dislike Posts
  - [x] Comment on Posts
  - [x] Friend Requests (Send, Accept, Reject)
  - [x] Follow/Unfollow System
- **Discovery & Feed**
  - [x] Personalized Feed (Friends + Following + Self)
  - [x] Explore Page (Grid view of all users)
  - [x] "Suggested for you" sidebar in Feed
  - [x] "Liked by" display on posts
- **UI/UX**
  - [x] Modern Dark Theme (Shadcn/Zinc inspired)
  - [x] Responsive Design
  - [x] Glassmorphism Navigation

## 🚧 In Progress / Refinement

- **Supabase Integration**
  - [ ] **Storage**: Re-enable Supabase S3 for image storage (currently using local storage fallback).
  - [ ] **Database**: (Optional) Migrate SQLite to Supabase PostgreSQL for production.
- **University Features**
  - [ ] **University Verification**: Verify users actually attend the university they claim (e.g., `.edu` email check).
  - [ ] **University Feed**: Filter posts to show only those from your university.

## 🚀 Future Features (Roadmap)

- **Messaging System**
  - [ ] Direct Messages (DM) between friends.
  - [ ] Real-time chat notifications.
- **Notifications**
  - [ ] Activity page showing new likes, comments, and friend requests.
  - [ ] Real-time badges in the navbar.
- **Post Enhancements**
  - [ ] Multiple image uploads (Carousel).
  - [ ] Video support.
  - [ ] Tagging users in posts.
- **Search**
  - [ ] Global search bar for finding Users and Posts.
- **Settings**
  - [ ] Change Password.
  - [ ] Privacy settings (Public/Private profile).
- **Deployment**
  - [ ] Configure `gunicorn` and `whitenoise` for production serving.
  - [ ] Deploy to a host (Railway, Render, or Vercel).
