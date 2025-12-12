# GOUNION Implementation Plan

This document outlines the roadmap for evolving GOUNION into a full-featured social media platform comparable to Facebook, tailored for university students.

## 🛡️ Security Priority: Row Level Security (RLS)

**Current Status:** RLS is disabled on Supabase.
**Risk:** While the FastAPI backend handles authorization, if the Supabase anon/service keys are ever exposed or if we add a direct frontend client later, data is vulnerable.
**Action:** Enable RLS on all tables and create policies.

### Implementation Strategy

Even though our FastAPI backend connects as a "superuser" (postgres role) which bypasses RLS, enabling it is a critical best practice for "Defense in Depth".

**SQL Policies to Apply (via Supabase Dashboard SQL Editor):**

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
-- ... repeat for all tables

-- Example Policy: Public Read Access
CREATE POLICY "Public profiles are viewable by everyone"
ON profiles FOR SELECT USING (true);

-- Example Policy: Owner Write Access
CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE USING (auth.uid() = user_id);
```

_Note: Since we use a Python backend, we mainly need to ensure that if we ever use the Supabase JS client, these policies hold. For now, we will focus on Application-Level Security in FastAPI._

---

## 🚀 Phase 1: Engagement & Interactions (The "Social" Layer)

**Goal:** Move beyond simple "likes" to rich interactions.

### 1.1 Reactions

- **Feature:** Users can React (Like, Love, Haha, Wow, Sad, Angry) to posts.
- **DB Changes:**
  - Create `Reactions` table: `id`, `user_id`, `post_id`, `type` (enum/string).
  - Remove `post_likes` association table (migrating data if necessary).
- **API:** `POST /posts/{id}/react`, `DELETE /posts/{id}/react`.

### 1.2 Shares & Reposts

- **Feature:** Share a post to your own feed with a caption.
- **DB Changes:**
  - Update `Post` table: Add `original_post_id` (ForeignKey to self).
- **API:** `POST /posts/{id}/share`.

### 1.3 Saved Posts (Bookmarks)

- **Feature:** Save posts for later.
- **DB Changes:**
  - Create `SavedPosts` table: `user_id`, `post_id`, `saved_at`.
- **API:** `POST /posts/{id}/save`, `GET /users/me/saved`.

---

## 🏛️ Phase 2: Communities (The "Union" Layer)

**Goal:** Create spaces for student societies, clubs, and study groups.

### 2.1 Groups System

- **Feature:** Create and join groups.
- **DB Changes:**
  - `Groups`: `id`, `name`, `description`, `privacy`, `creator_id`.
  - `GroupMembers`: `group_id`, `user_id`, `role` (admin/member).
- **API:** CRUD for Groups, Join/Leave endpoints.

### 2.2 Group Feed

- **Feature:** Posts specifically belonging to a group.
- **DB Changes:**
  - Update `Post` table: Add `group_id` (nullable ForeignKey).
- **API:** `GET /groups/{id}/posts`, `POST /groups/{id}/posts`.

---

## 💬 Phase 3: Real-Time Communication

**Goal:** Instant messaging.

### 3.1 Direct Messages (1-on-1)

- **Feature:** Private chat.
- **DB Changes:**
  - `Conversations`: `id`, `created_at`.
  - `ConversationParticipants`: `conversation_id`, `user_id`.
  - `Messages`: `id`, `conversation_id`, `sender_id`, `content`, `created_at`.
- **Tech:** WebSockets (`FastAPI.WebSockets`).

---

## 🛒 Phase 4: Marketplace & Events (Utility Layer)

**Goal:** Student life utilities.

### 4.1 Marketplace

- **Feature:** Buy/Sell items.
- **DB Changes:** `Listings` table.

### 4.2 Events

- **Feature:** Calendar events.
- **DB Changes:** `Events`, `EventAttendees`.

---

## 📋 Immediate Execution Plan

1.  **Refactor Likes to Reactions**: This is a fundamental change to the data model.
2.  **Implement Saved Posts**: Low hanging fruit, high value.
3.  **Implement Groups**: The core differentiator for "GoUnion".
