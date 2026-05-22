# AeroLogic

AeroLogic is a beginner-friendly virtual aviation learning platform for flight
simulator users. Version 1 focuses on Airbus A320 normal virtual flight procedures.

## Project Description

AeroLogic guides flight simulator beginners through the normal flow of a virtual
flight — from aircraft preparation to shutdown — using simple, structured,
checklist-based lessons. Learners create an account, work through the Airbus A320
lesson path, and track their progress, which is saved in a MongoDB database.

## Purpose of the Website

Many flight simulator beginners are overwhelmed by technical procedures. AeroLogic
provides a clear, beginner-friendly, step-by-step A320 virtual flight lesson flow
with progress tracking, so learners always know what to do next and can continue
where they left off.

## Tech Stack

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Render (deployment)
- GitHub (version control)

## Main Pages

- Home Page (`index.html`)
- Sign Up Page (`signup.html`)
- Login Page (`login.html`)
- Lessons Page (`lessons.html`)
- My Progress Page (`myprogress.html`)
- Profile / My Account Page (`profile.html`)

## Main Features

- User registration and login (JWT authentication, bcrypt-hashed passwords)
- Default A320 progress record created automatically after signup
- Airbus A320 lesson path (7 guided lessons)
- Lesson checklist completion with step-by-step unlocking
- External tutorial reference videos inside each lesson step
- MongoDB-connected progress tracking (percentage, status, current lesson)
- Aircraft and lesson search
- Edit username and display title
- Reset A320 progress
- Delete account (with cascade delete of progress)
- Achievement badge / rank display
- Lesson resources links
- Responsive layout for desktop, tablet, and mobile

## MongoDB Collections

The Atlas database is named `aerologic` and uses five collections:

- `users` — registered accounts (full name, username, email, hashed password,
  display title, role, timestamps).
- `progresses` — each user's A320 progress. Named `progresses` because Mongoose
  automatically pluralizes the `Progress` model name.
- `lessons` — the 7 Airbus A320 lessons (title, description, checklist, order).
- `aircraft` — available and upcoming aircraft. The collection name is explicitly
  set to `aircraft` (singular) in the model.
- `badges` — achievement badges (Bronze, Silver, Gold, Platinum) with their
  required completion counts.

Note: an older `aircrafts` (plural) collection may exist from earlier development.
The current code uses only `aircraft` (singular).

## CRUD Explanation

All CRUD operations are performed through the website interface.

| Operation | Website action | Route | Collection | Description |
|-----------|----------------|-------|------------|-------------|
| Create | Sign up | `POST /api/auth/signup` | users, progresses | Creates a user and a default A320 progress record |
| Read | View lessons / progress / profile / search | `GET /api/lessons/:slug`, `/api/aircraft`, `/api/progress/me`, `/api/auth/me`, `/api/search` | lessons, aircraft, progresses, users | Displays stored data |
| Update | Mark complete / reset progress / edit profile | `POST /api/progress/complete`, `PUT /api/progress/me/reset`, `PUT /api/users/me` | progresses, users | Updates progress or account fields |
| Delete | Delete account | `DELETE /api/users/me` | users, progresses | Deletes the user and all related progress |

## Database-driven Features

- Aircraft and lesson search (`/api/search`)
- Progress status tracking (Not Started / In Progress / Completed, with percentage)
- Completion count and achievement badge display

## Installation Instructions

Clone the repository, then install dependencies:

```
npm install
```

## Environment Variables

Create a `.env` file in the project root:

```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

Do not upload `.env` publicly or commit it to GitHub. It is already listed in
`.gitignore`.

## Running Locally

Seed the database, then start the server:

```
node seed.js
npm start
```

Or run in development mode with auto-reload:

```
npm run dev
```

Then open:

```
http://localhost:3000
```

## Seeding the Database

`node seed.js` populates the `aircraft`, `lessons`, and `badges` collections.
It does not modify `users` or `progresses`.

## Testing the Website

- http://localhost:3000
- http://localhost:3000/signup.html
- http://localhost:3000/login.html
- http://localhost:3000/lessons.html
- http://localhost:3000/myprogress.html
- http://localhost:3000/profile.html

## mongosh Verification

```
use aerologic
show collections
db.users.find({}, { password: 0 }).pretty()
db.lessons.find().sort({ order: 1 }).pretty()
db.progresses.find().pretty()
db.badges.find().pretty()
```

## Deployment

The website is deployed on Render. MongoDB Atlas is used as the cloud database.
Environment variables (`MONGO_URI`, `JWT_SECRET`) are configured in the Render
dashboard. Build command: `npm install`. Start command: `npm start`.

## Disclaimer

AeroLogic is for flight simulator learning only and is not intended for
real-world flight training.

## Developer

Name: Alfonso Raphael Candia
Course / Section: BSIT 2-10
