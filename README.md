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
    }
}
```

---

### Login User

- Route: /api/auth/login
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
    token: 'sjlkafjkldsfjsd'
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
    items: [{ name: 'chicken pizza', price: 900, size: 'm', quantity: 1}]
}
```

- Responses

Success

```
{
    state: 1,
    total_price: 900,
    created_at: Mon Oct 31 2022 08:35:00 GMT+0100,
    items: [{ name: 'chicken pizza', price: 900, size: 'm', quantity: 1}]
}
```

---

### Get Blog

- Route: /api/blog/:id
- Method: GET
- Header
  - Authorization: Bearer {token}
- Responses

Success

```
{
    state: 1,
    total_price: 900,
    created_at: Mon Oct 31 2022 08:35:00 GMT+0100,
    items: [{ name: 'chicken pizza', price: 900, size: 'm', quantity: 1}]
}
```

---

### Get Orders

- Route: /orders
- Method: GET
- Header:
  - Authorization: Bearer {token}
- Query params:
  - page (default: 1)
  - per_page (default: 10)
  - order_by (default: created_at)
  - order (options: asc | desc, default: desc)
  - state
  - created_at
- Responses

Success

```
{
    state: 1,
    total_price: 900,
    created_at: Mon Oct 31 2022 08:35:00 GMT+0100,
    items: [{ name: 'chicken pizza', price: 900, size: 'm', quantity: 1}]
}
```

---

...

## Contributor

- Ayooluwa Adeleke
