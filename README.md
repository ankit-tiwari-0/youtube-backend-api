# 🎬 YouTube Backend API

<img width="1916" height="991" alt="image" src="https://github.com/user-attachments/assets/3314276c-aa49-42e5-83df-9b406d847a79" />


A backend-only REST API inspired by core YouTube functionality.

This project provides APIs for:

- 👤 User authentication
- 🔐 JWT-based authorization
- 🖼️ Profile image uploads
- 🎥 Video uploads
- ✏️ Video updates
- 🗑️ Video deletion
- ❤️ Video likes
- 👎 Video dislikes
- 👁️ Video views
- 💬 Comments
- 🔔 Channel subscriptions
- 🔎 Video filtering by category and tags

> ⚠️ This project does **not** contain a frontend.
>
> All APIs can be tested using **Postman**.

---

# 🚀 Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

### File Storage

- ImageKit
- express-fileupload

### API Testing

- Postman

---

# 📁 Project Structure

```text
youtube-backend-api/
│
├── config/
│   └── imagekit.js
│
├── controllers/
│   ├── user.controller.js
│   ├── video.controller.js
│   └── comment.controller.js
│
├── middleware/
│   ├── auth.middleware.js
│   └── ownership.middleware.js
│
├── models/
│   ├── user.model.js
│   ├── video.model.js
│   └── comment.model.js
│
├── routes/
│   ├── user.routes.js
│   ├── video.routes.js
│   └── comment.routes.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js

⚙️ Installation
1. Clone the Repository
git clone https://github.com/YOUR_USERNAME/youtube-backend-api.git

Move into the project:

cd youtube-backend-api
2. Install Dependencies
npm install
🔐 Environment Variables

Create a .env file in the root directory.

PORT=3000


MONGO_URI=your_mongodb_connection_string


JWT_SECRET=your_secret_key


IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
Example
PORT=3000


MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/youtube-api


JWT_SECRET=your_super_secret_key


IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id

⚠️ Never commit .env to GitHub.

▶️ Run the Server

Start the development server:

npm run dev

Or:

node server.js

Server:

http://localhost:3000
🧪 Testing With Postman

This project does not have a frontend.

Use Postman to test all APIs.

Base URL
http://localhost:3000/api
👤 USER APIs
1. Signup
Request
POST /user/signup
Full URL
http://localhost:3000/api/user/signup
Body

Select:

Body → form-data

Add:

Key	Type	Value
channelName	Text	My Channel
email	Text	test@gmail.com
phone	Text	9876543210
password	Text	123456
logo	File	Select an image
Example Response
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "_id": "USER_ID",
    "channelName": "My Channel",
    "email": "test@gmail.com",
    "phone": "9876543210",
    "logoUrl": "https://ik.imagekit.io/...",
    "logoId": "IMAGE_ID",
    "subscribers": 0
  }
}

The password is hashed using bcrypt.

🔑 2. Login
Request
POST /user/login
URL
http://localhost:3000/api/user/login
Body

Select:

Body → raw → JSON
{
  "email": "test@gmail.com",
  "password": "123456"
}
Response
{
  "success": true,
  "message": "Login successful",
  "token": "YOUR_JWT_TOKEN"
}

Copy the token.

🔐 Authentication

Protected APIs require a JWT.

In Postman:

Authorization
      ↓
Type: Bearer Token
      ↓
Paste JWT

Paste only:

eyJhbGciOiJIUzI1NiIs...

Do not manually write:

Bearer eyJhbGciOiJIUzI1NiIs...

Postman automatically adds Bearer.

👤 3. Update Profile
Request
PUT /user/update-profile
URL
http://localhost:3000/api/user/update-profile
Authorization
Bearer Token
Body

Select:

form-data
Key	Type	Value
channelName	Text	New Channel Name
phone	Text	9876543210
logo	File	New profile image

All fields are optional.

🔔 4. Subscribe
Request
POST /user/subscribe
URL
http://localhost:3000/api/user/subscribe
Authorization
Bearer Token
Body
{
  "channelId": "CHANNEL_USER_ID"
}

The logged-in user will subscribe to that channel.

A user cannot subscribe to their own channel.

🎥 VIDEO APIs
5. Upload Video
Request
POST /video/upload
URL
http://localhost:3000/api/video/upload
Authorization
Bearer Token
Body

Select:

Body → form-data
Key	Type	Value
title	Text	My First Video
description	Text	My first YouTube API video
category	Text	Education
tags	Text	nodejs,express,mongodb
video	File	Select .mp4
thumbnail	File	Select image

The video and thumbnail are uploaded to ImageKit.

The video is associated with the currently authenticated user.

✏️ 6. Update Video
Request
PUT /video/update/:id
Example
http://localhost:3000/api/video/update/VIDEO_ID
Authorization
Bearer Token

Only the owner of the video can update it.

Body

Select:

form-data
Key	Type	Value
title	Text	Updated Title
description	Text	Updated description
category	Text	Technology
tags	Text	nodejs,jwt
thumbnail	File	Optional new thumbnail
🗑️ 7. Delete Video
Request
DELETE /video/delete/:id
Example
http://localhost:3000/api/video/delete/VIDEO_ID
Authorization
Bearer Token

Only the video owner can delete the video.

The API removes:

Video from ImageKit
Thumbnail from ImageKit
Video document from MongoDB
📺 8. Get All Videos
Request
GET /video/all
URL
http://localhost:3000/api/video/all

Authentication is not required.

Returns videos sorted by newest first.

👤 9. Get My Videos
Request
GET /video/my-videos
URL
http://localhost:3000/api/video/my-videos
Authorization
Bearer Token

Returns videos uploaded by the logged-in user.

🎬 10. Get Video By ID
Request
GET /video/:id
Example
http://localhost:3000/api/video/VIDEO_ID
Authorization
Bearer Token

When a user opens a video, their ID is added to the viewedBy array.

Duplicate views from the same user are prevented using $addToSet.

📂 11. Get Videos By Category
Request
GET /video/category/:category
Example
http://localhost:3000/api/video/category/Education

Returns videos belonging to that category.

🏷️ 12. Get Videos By Tag
Request
GET /video/tags/:tag
Example
http://localhost:3000/api/video/tags/nodejs

Returns videos containing the specified tag.

❤️ 13. Like Video
Request
POST /video/like
URL
http://localhost:3000/api/video/like
Authorization
Bearer Token
Body
{
  "videoId": "VIDEO_ID"
}

If the user previously disliked the video, the dislike is removed.

👎 14. Dislike Video
Request
POST /video/dislike
URL
http://localhost:3000/api/video/dislike
Authorization
Bearer Token
Body
{
  "videoId": "VIDEO_ID"
}

If the user previously liked the video, the like is removed.

💬 COMMENT APIs
15. Add Comment
Request
POST /comment/new
URL
http://localhost:3000/api/comment/new
Authorization
Bearer Token
Body
{
  "video_id": "VIDEO_ID",
  "commentText": "Great video!"
}
🗑️ 16. Delete Comment
Request
DELETE /comment/:commentId
Example
http://localhost:3000/api/comment/COMMENT_ID
Authorization
Bearer Token

Only the user who created the comment can delete it.

✏️ 17. Update Comment
Request
PUT /comment/:commentId
Example
http://localhost:3000/api/comment/COMMENT_ID
Authorization
Bearer Token
Body
{
  "commentText": "Updated comment"
}

Only the comment owner can edit it.

💬 18. Get Video Comments
Request
GET /comment/comment/:videoId
Example
http://localhost:3000/api/comment/comment/VIDEO_ID

Authentication is not required.

The API also returns basic user information:

channelName
logoUrl
🔐 Authentication Flow

The authentication system uses JWT.

Signup
   ↓
Password hashed with bcrypt
   ↓
User saved in MongoDB
   ↓
Login
   ↓
Password verification
   ↓
JWT generated
   ↓
Client / Postman
   ↓
Bearer Token
   ↓
checkAuth middleware
   ↓
JWT verification
   ↓
req.user.id

The JWT contains only the user's ID:

{
  "id": "USER_ID"
}

It expires after:

1 hour
🛡️ Authorization

The project uses two important middleware concepts.

Authentication

checkAuth

Checks whether the JWT is valid.

Ownership

checkOwnership

Checks whether the logged-in user owns the requested video.

For example:

PUT /video/update/:id
        ↓
   checkAuth
        ↓
 checkOwnership
        ↓
 update controller

This prevents one user from modifying or deleting another user's videos.

☁️ ImageKit

ImageKit is used for storing:

Profile pictures
Video files
Video thumbnails

The API stores the ImageKit URL and file ID in MongoDB.

Example:

{
  "videoUrl": "https://ik.imagekit.io/...",
  "videoId": "imagekit-file-id",
  "thumbnailUrl": "https://ik.imagekit.io/...",
  "thumbnailId": "imagekit-file-id"
}
🗄️ Database

MongoDB is used as the primary database.

Main Collections
Users
Videos
Comments
User
_id
channelName
email
phone
password
logoUrl
logoId
subscribers
subscribedchannels
createdAt
updatedAt
Video
_id
title
description
user_id
videoUrl
videoId
thumbnailUrl
thumbnailId
category
tags
likes
dislikes
viewedBy
createdAt
updatedAt
Comment
_id
video_id
user_id
commentText
createdAt
updatedAt
📌 API Summary
Method	Endpoint	Auth	Purpose
POST	/user/signup	❌	Create account
POST	/user/login	❌	Login
PUT	/user/update-profile	✅	Update profile
POST	/user/subscribe	✅	Subscribe to channel
POST	/video/upload	✅	Upload video
PUT	/video/update/:id	✅ Owner	Update video
DELETE	/video/delete/:id	✅ Owner	Delete video
GET	/video/all	❌	Get all videos
GET	/video/my-videos	✅	Get own videos
GET	/video/:id	✅	Get video
GET	/video/category/:category	❌	Filter by category
GET	/video/tags/:tag	❌	Filter by tag
POST	/video/like	✅	Like video
POST	/video/dislike	✅	Dislike video
POST	/comment/new	✅	Add comment
DELETE	/comment/:commentId	✅ Owner	Delete comment
PUT	/comment/:commentId	✅ Owner	Update comment
GET	/comment/comment/:videoId	❌	Get comments
🧪 Recommended Postman Testing Order

For someone testing the API for the first time:

1. Signup
      ↓
2. Login
      ↓
3. Copy JWT
      ↓
4. Update Profile
      ↓
5. Upload Video
      ↓
6. Get All Videos
      ↓
7. Get Video By ID
      ↓
8. Like / Dislike
      ↓
9. Add Comment
      ↓
10. Get Comments
      ↓
11. Update Comment
      ↓
12. Delete Comment
      ↓
13. Update Video
      ↓
14. Delete Video
⚠️ Important Notes
No Frontend

This repository contains only the backend API.

You can test everything using:

Postman
Thunder Client
Insomnia
Any frontend application
JWT

Protected endpoints require:

Authorization: Bearer <JWT>
File Uploads

For video uploads and profile images, use:

multipart/form-data

in Postman.

Environment Variables

Never upload:

.env

to GitHub.

🎯 Project Goal

The purpose of this project is to practice building a real-world backend API with:

REST API architecture
Authentication
Authorization
JWT
Password hashing
MongoDB relationships
File uploads
Cloud storage
CRUD operations
Likes and dislikes
Comments
Subscriptions
Ownership-based access control

This project focuses entirely on backend development and API design.

👨‍💻 Author

ANKIT

Backend Development Journey 🚀

Built with:

Node.js + Express.js + MongoDB + JWT + ImageKit
