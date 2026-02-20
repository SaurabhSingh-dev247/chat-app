# Real-Time Chat Application (MERN + WebSocket)

A full-stack real-time chat application built using the MERN stack with native WebSocket integration for instant messaging.

---

## Features

- User authentication
- One-to-one real-time messaging
- WebSocket-based bidirectional communication
- Infinite scroll pagination for message history
- Online / offline user status
- Persistent message storage in MongoDB
- Redux-based global state management

---

## Tech Stack

### Frontend

- React — UI development
- React Router — Client-side routing
- Redux Toolkit — Global state management
- Axios — HTTP requests
- WebSocket (Browser API) — Real-time communication
- Lucide React + SVG — Icons
- Vanilla CSS — Styling

### Backend

- Node.js — Runtime environment
- Express.js — API handling
- ws (WebSocket library) — Real-time message handling
- MongoDB — Database
- Mongoose — ODM for MongoDB
- validatorjs — Server-side input validation

---

## Project Structure

```
  chat-application/
  │
  ├── client/
  │ ├── public/
  │ └── src/
  │      ├── api
  │      ├── assets
  │      ├── components/
  │      ├──   ├── auth-folder
  │      ├──   ├── dashboard
  │      ├──   ├── friends
  │      ├──   ├── logout
  │      ├──   ├── settings
  │      ├──   ├── verification # Ignore this directory
  │      ├──   ├── About.jsx
  │      ├──   ├── Header.jsx
  │      ├──   ├── Home.jsx
  │      ├──   ├── LandingPage.jsx
  │      ├── store/
  │      ├── UI/
  │      ├── util/
  │      ├── App.css
  │      ├── App.jsx
  │      ├── index.css
  │      ├── main.jsx
  │
  ├── server/
  │ ├── public/
  │ ├── src/
  │ ├──   ├── model/
  │ ├──   ├── routes/
  │ ├──   ├── controllers/
  │ ├──   ├── service/
  │ ├──   ├── middleware/
  │ ├──   ├── util/
  │ ├──   ├── app.js
  │ ├── .env
  │ ├── package.json
  │ ├── package-lock.json
  │
  │
  └── README.md
```

---

## Installation & Setup

- Run this command on your local machine

```
git clone https://github.com/SaurabhSingh-dev247/chat-app.git
```

### Frontend Setup

```
 cd client
 npm install
 npm run dev
```

### Backend Setup

```
cd server
npm install
npm start

```

- create a `.env` file in the server directory

```
PORT=5193

MONGODB_CONNECTION_STRING=YOUR MONGO DB CONNECTION STRING (Local or remote)

ACCESS_SECRET=RANDOM STRING FOR CHARACTERS

REFRESH_SECRET=RANDOM STRING FOR CHARACTERS
```

---

## Architecture Overview

1. The client establishes a WebSocket connection with the server.
2. Messages are:
   - Instantly delivered via WebSocket
   - Persisted into MongoDB for durability
3. Infinite scroll loads older messages using pagination.
4. Redux manages:
   - Active conversations
   - Messages
   - Online users
   - UI state

---

## Core Learnings

Building this project helped me understand:

- How real-time systems like WhatsApp, Instagram, Discord, and Slack manage message flow
- How WebSocket-based bidirectional communication works internally
- Managing complex global state using Redux Toolkit
- Implementing infinite scroll pagination used in modern applications
- Handling real-time updates while maintaining database persistence
- Structuring scalable backend systems for chat-based architectures

---

## Current Limitations

- No automatic WebSocket reconnection logic
- No fault-tolerant message queue (messages are stored directly in the database)
- Dashboard UI is not fully responsive
- No group chat functionality
- No media support (video/audio/file sharing)

---

## Future Improvements

Planned enhancements:

- Reconnection and retry logic for WebSocket
- Message acknowledgment (ACK) system
- Message queue integration (Redis or Kafka) for scalability
- Group chat support
- File sharing
- Audio/Video calling (WebRTC integration)
- Fully responsive UI
- Rate limiting and security hardening
- Deployment and horizontal scaling support

---

## Why This Project Matters

This project is more than just a chat application. It explores:

- Real-time distributed systems
- State synchronization challenges
- Backend reliability concerns
- Scalability considerations in messaging platforms

It reflects practical engineering decisions beyond basic UI implementation.
