
# Introduction

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

A simple NestJS note RESTful API with Google OAuth.


# Table of Contents

- [Introduction](#introduction)
- [Table of Contents](#table-of-contents)
- [Running Locally](#running-locally)
- [API Reference](#api-reference)
  - [Get access token](#get-access-token)
  - [Get all notes](#get-all-notes)
  - [Get a note](#get-a-note)
  - [Create a Note](#create-a-note)
  - [Update a Note](#update-a-note)
  - [Delete a Note](#delete-a-note)
  - [Swagger Docs](#swagger-docs)
- [Running Tests](#running-tests)

# Running Locally

To run this project, you will need to add the your own `.env` file at the root of the project, check out **`.env.template`** from the project files.

But first, clone the project.

```bash
  git clone https://github.com/Jiseeeh/note-restful
```

To get the **values** of the google client and secret, you need to make a new project at [Google Cloud Console](https://console.cloud.google.com/projectcreate).

After creating a project, you will be redirected to the Google Console's dashboard, look for the sidebar at the left and click **APIs & Services**

The sidebar will refresh and now look for **OAuth consent screen** and click it.

Now fill out the required informations such as the ff:

**User Type** to External (after that, click create and a new form will appear)

> [!NOTE]  
> Anything you see in the google console that is not here, is not required or optional in setting our Google OAuth

- **App Name** to anything you like.
- **User support email** to your google email as it uses the account that the project is associated with.
- **Developer contact information** to any email you want.

Click **SAVE AND CONTINUE**

After loading, click **ADD OR REMOVE SCOPES** and select the first three(3)

Scroll down and Click **SAVE AND CONTINUE**

Skip the test users and Click **SAVE AND CONTINUE** again.

Next is click **Credentials** in the sidebar and look for **Create Credentials** near the search bar in the middle.

And Select **OAuth client ID** and set **Application Type** to Web application and name it as you like.

Scroll down and you will see **Authorized JavaScript origins**, set it to `http://localhost:3000`

And the **Authorized redirect URIs** to `http://localhost:3000/api/auth/google/callback` as it was the path I defined in the code.

Click **Create** and a dialog will show containing the values of our env keys, add the respective value in your `.env`

Lastly for the **MONGODB_URI**, you can use your local mongodb or a hosted one.

Go to the project directory

```bash
  cd note-restful
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

# API Reference

> [!NOTE]
>Before you can access the note routes, you need to have an access token present in the request headers.

## Get access token

```http
  GET /api/auth/login-google
```

Visit the route to login with google and include the given token to future requests, you can use something like **POSTMAN**.

## Get all notes

```http
  GET /api/notes
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `page?`   | `number` | the current page you want to get |
| `limit?`   | `number`| the amount of notes you want to get per page |

## Get a note

```http
  GET /api/notes/${noteId}
```

`noteId` of the note to be fetched

## Create a Note

```http
  POST /api/notes
```

Sample body value

```json
{
  "title": "string",
  "content": "stringstri",
  "tags": [
    "WORK" // could be "WORK", "OTHER", "PERSONAL", "SHOPPING" check out tags.enum.ts
  ]
}
```

## Update a Note

```http
  PATCH /api/notes/${noteId}
```

Sample body value is the same as above but all are optional

## Delete a Note

```http
  DELETE /api/notes/${noteId}
```

`noteId` of the note to be deleted

## Swagger Docs

```http
  GET /api/docs
```

Endpoint to see more about the api docs, just visit the route.

# Running Tests

To run unit tests

```bash
  npm run test
```

To run e2e tests

```bash
npm run test:e2e
```
