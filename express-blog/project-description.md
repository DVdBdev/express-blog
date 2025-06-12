
# 📘 Internship Blog Platform - Project Description

A multi-user blog platform built with **Node.js**, **Express**, **MongoDB**, **EJS**, and **TailwindCSS**. Designed for internship students to document and share their weekly experiences.

---

## 🌐 Pages Overview

### 1. `/` - Landing Page
- Publicly accessible
- Brief platform intro and call-to-action
- Buttons to Register/Login
- Link to browse blogs

---

### 2. `/register` - Register
- Create a new user account
- Inputs: name, email, password
- Error handling and validation

---

### 3. `/login` - Login
- Login form for existing users
- Password validation and feedback

---

### 4. `/dashboard` - User Dashboard
- Available after login
- Personalized greeting
- Quick access to:
  - Create Blog
  - View My Blogs
  - Edit Profile
  - Blog Stats (e.g., total blogs written, views, likes)

---

### 5. `/blogs/new` - Create Blog
- Form for writing a blog
- Fields: title, content (Markdown editor), tags
- Toggle visibility: Public / Private
- Save as draft or publish

---

### 6. `/blogs/:id/edit` - Edit Blog
- Edit form for blog owner
- Modify content, title, tags, visibility
- Delete or update

---

### 7. `/blogs/:id` - View Single Blog
- Publicly accessible (if marked public)
- Shows title, content, author, date, tags
- Like button, comment section (for logged-in users)
- View count and blog statistics

---

### 8. `/blogs` - All Blogs Feed
- Publicly accessible
- Grid/list of public blogs
- Filters by tag, author, or date
- Search bar

---

### 9. `/users/:id` - User Profile
- Public view of author profile
- Displays name, bio, and public blogs

---

### 10. `/settings` - User Settings
- Manage account info
- Update email/password
- Upload profile picture
- Edit bio

---

### 11. `/admin` - Admin Panel
- Only accessible to admin users
- Manage all users and blogs
- Moderate reported content
- Remove inappropriate comments or posts
- View platform usage stats

---

### 🌟 Required Extra Features
- Dark/Light mode toggle
- Blog statistics (views, likes)
- Notifications for interactions (likes, comments)
- Markdown editor for blog content
- Mobile-first responsive design using TailwindCSS
