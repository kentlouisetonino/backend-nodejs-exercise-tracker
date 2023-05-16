## Description

> - A backend application that allows adding a user and tracks their exercise progress using NodeJS.
> - This is my final solution of the FreeCodeCampe Exercise Tracker challenge.
> - Reference: https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/exercise-tracker

<br />
<br />
<br />

## Setup

> - Create a new `.env` file and put the corresponding `key-value` pairs.

```bash
# * MongoDB
MONGODB_URI=

# * Local
PORT=
```

> - Run the following commands.

```bash
npm run build
npm run dev
```

> - REST API endpoints.

```bash
# Create a User
HTTP METHOD: POST
URL: http://localhost:14000/api/users
Body (JSON Raw):
  { "username": string }

# Get the Users
HTTP METHOD: POST
URL: http://localhost:14000/api/users

# Create an Exercise
HTTP METHOD: POST
URL: http://localhost:14000/api/users/:_id/exercises
Param: { _id: "user id" }
Body (Form Data):
  { "date": string (optional), "description": string, "duration": number }

# Get Logs
HTTP METHOD: GET
URL: http://localhost:14000/api/users/:_id/logs
Param: { _id: string }
```

<br />
<br />
<br />

## Testing

[Screencast from Sunday, 26 March, 2023 11:04:47 AM PST.webm](https://user-images.githubusercontent.com/69438999/227753033-82fee816-1c9b-4dc4-98c7-a60b62a525b6.webm)
