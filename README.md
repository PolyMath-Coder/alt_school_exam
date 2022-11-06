# Backend NodeJS Second Semester Examination Project

This is an api for a pizza app

---

## Requirements

1. User should be able to register
2. User should be able to login with Passport using JWT
3. Implement basic auth
4. User should be able to get orders
5. Users should be able to create orders
6. Users should be able to update and delete orders
7. Test application

---

## Setup

- Install NodeJS, mongodb
- pull this repo
- Run `npm install` to install needful dependencies.
- update env with example.env
- run `npm start` to kickstart application

---

## Base URL

- https://altschool-main-gu6shej6fdawnik.herokuapp.com/

## Models

---

### User

| field      | data_type | constraints |
| ---------- | --------- | ----------- |
| id         | string    | required    |
| username   | string    | optional    |
| first_name | string    | required    |
| last_name  | string    | required    |
| email      | string    | required    |
| password   | string    | required    |

### Blog

| field        | data_type | constraints                            |
| ------------ | --------- | -------------------------------------- |
| id           | string    | required                               |
| created_at   | date      | required                               |
| state        | string    | required, enum: ['draft', 'published'] |
| title        | number    | required                               |
| reading_time | number    | required                               |
| read_count   | number    | required                               |
| tags         | string    | required                               |
| author       | id        | required                               |
| body         | string    | required, enum:                        |

## APIs

---

### Signup User

- Route: /api/auth/signup
- Method: POST
- Body:

```
{
  "email": "doe@example.com",
  "password": "Password1",
  "first_name": "jon",
  "last_name": "doe",
  "username": 'jon_doe",
}
```

- Responses

Success

```
{
    message: 'Signup successful',
    user: {
        "email": "doe@example.com",
        "password": "Password1",
        "first_name": "jon",
        "last_name": "doe",
        "username": 'jon_doe",
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM2Njg0OGIzNGQ4OTIzYjA1NjM5NjJkIiwiZW1haWwiOiJheW9sdXdhbWlyYWNsZUBnbWFpbC5jb20ifSwiaWF0IjoxNjY3NjYyOTg5LCJleHAiOjE2Njc2NjY1ODl9.YPoI35Y5oJqdmIRBTWOm8scFR7sDDhCav-Fw8VFaqX8"
}
```

---

### Login User

- Route: /api/auth/signin
- Method: POST
- Body:

```
{
  "password": "Password1",
  "username": 'jon_doe",
}
```

- Responses

Success

```
{
    message: 'Login successful',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM2Njg0OGIzNGQ4OTIzYjA1NjM5NjJkIiwiZW1haWwiOiJheW9sdXdhbWlyYWNsZUBnbWFpbC5jb20ifSwiaWF0IjoxNjY3NjYyOTg5LCJleHAiOjE2Njc2NjY1ODl9.YPoI35Y5oJqdmIRBTWOm8scFR7sDDhCav-Fw8VFaqX8'
}
```

---

### Create Blog

- Route: /api/blog/create
- Method: POST
- Header
  - Authorization: Bearer {token}
- Body:

```
{
       title: "The King's Horseman",
      "description": "A tale by moonlight prose.",
      "blog": "Once upon a time...",
      "tags": "fiction"
}
```

- Responses

Success

```
{
    status: "success,
    msg: "Blog successfully created...",
    blog: {
      _id: "635fd42952267b47b3f6e0c9",
      title: "The King's Horseman",
      "description": "A tale by moonlight prose.",
      "author": [
        {
          "_id": "5fd42952267b47b3f69499",
          "email: "johndoe@gmail.com",
          "password": "$2b$10\$tddpO5TKboEOEQaOsL9ytOjF14HwmT95IWlC3eSiKFJ7uizJI9GX6",
          "first_name":"John",
          "last_name": "Doe",
          "username" : "johnnydoe"
        }
      ]
      "state": "published",
      "read_count": 1,
      "reading_time": "4"
      "createdAt": "2022-11-02T13:27:00.984Z",
      "updatedAt": "2022-11-05T15:43:56.005Z",
      "__v": 0
    }
    total_price: 900,
    created_at: Mon Oct 31 2022 08:35:00 GMT+0100,
}

```

```

```

---

### Get Single Blog

- Route: /api/blog/:id
- Method: GET
- Header
  - Authorization: Bearer {token}
- Responses

Success

```
{
    status: "success,
    msg: "Blog successfully retrieved",
    blog: {
      _id: "635fd42952267b47b3f6e0c9",
      title: "The King's Horseman",
      "description": "A tale by moonlight prose.",
      "author": [
        {
          "_id": "5fd42952267b47b3f69499",
          "email: "johndoe@gmail.com",
          "password": "$2b$10\$tddpO5TKboEOEQaOsL9ytOjF14HwmT95IWlC3eSiKFJ7uizJI9GX6",
          "first_name":"John",
          "last_name": "Doe",
          "username" : "johnnydoe"
        }
      ]
      "state": "published",
      "read_count": 1,
      "reading_time": "4"
      "createdAt": "2022-11-02T13:27:00.984Z",
      "updatedAt": "2022-11-05T15:43:56.005Z",
      "__v": 0
    }
    total_price: 900,
    created_at: Mon Oct 31 2022 08:35:00 GMT+0100,
}
```

---

### Author updates their Blog

#### Only authors who create their blogs are authorized here...

- Route: /api/blog/update/:id
- Method: PUT
- Header
  - Authorization: Bearer {token}
- Responses

{
status: "success,
msg: "Blog successfully updated...",
blog: {
\_id: "635fd42952267b47b3f6e0c9",
title: "The King's Horseman",
"description": "A tale by moonlight prose.",
"author": [
{
"_id": "5fd42952267b47b3f69499",
"email: "johndoe@gmail.com",
"password": "$2b$10\$tddpO5TKboEOEQaOsL9ytOjF14HwmT95IWlC3eSiKFJ7uizJI9GX6",
"first_name":"John",
"last_name": "Doe",
"username" : "johnnydoe"
}
]
"state": "published",
"read_count": 1,
"reading_time": "4"
"createdAt": "2022-11-02T13:27:00.984Z",
"updatedAt": "2022-11-05T15:43:56.005Z",
"\_\_v": 0
}
total_price: 900,
created_at: Mon Oct 31 2022 08:35:00 GMT+0100,
}

---

### Author gets their Blogs

#### Only authors who create their blogs are authorized here...

- Route: /api/blog/author/blogs
- Method: GET
- Header
  - Authorization: Bearer {token}
- Responses

Success

```
{
    "status": "success",
     "msg": "All authors blogs successfully retrieved...",
    data: [ all blog data]
}
```

---

### Get Blogs

- Route: /api/blog/all
- Method: GET
- Header:
  - Authorization: Bearer {token}
- Query params:
  - page (default: 1)
  - per_page (default: 20)
  - order_by_timestamp (default: created_at)
  - order_by_read_count(default: read_count)
  - order_by_reading_time (default: reading_time)
  - search_by_author(default: authorName)
  - search_by_title(default: blogTitle)
  - search_by_tags(default: tags)
  - created_at
- Responses

Success

```
{
    "status": "success",
     "msg": "All blogs successfully retrieved...",
    data: [ all blog data]
}
```

---

- Route: /api/delete/:id
- Method: DELETE
- Header:
- Authorization: Bearer {token}

{
"status": "success",
"msg": "Blog with the id of 'id' has been successfully deleted...",

}

---

...

## Contributor

- Ayooluwa Adeleke
