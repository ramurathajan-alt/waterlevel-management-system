# Water Level Management System

## Overview

The Water Level Management System is a full-stack web application designed to monitor and manage water resources efficiently. The system provides real-time water level monitoring, gate status management, irrigation scheduling, and SMS alert notifications to users.

## Features

### Public Portal

* View current water levels
* Check gate status (Open/Closed)
* View irrigation schedules
* Interactive location map
* Real-time updates

### Admin Dashboard

* Manage water gate operations
* Update water levels
* Configure irrigation schedules
* Manage SMS notification recipients
* Monitor system alerts

### SMS Alert System

* Send automatic notifications
* Multi-language support
* Gate status alerts
* Water level warnings

## Technologies Used

### Frontend

* React.js
* TypeScript
* CSS
* Redux Toolkit

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### External Services

* Text.lk SMS API
* Google Maps Integration

## Installation

### Clone Repository

```bash
git clone https://github.com/ramurathajan-alt/waterlevel-management-system.git
cd waterlevel-management-system
```

### Backend Setup

```bash
cd backend
npm install
npm run server
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file and configure:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
TEXTLK_API_KEY=your_api_key
TEXTLK_SENDER_ID=your_sender_id
```

## System Modules

* User Authentication
* Water Level Monitoring
* Gate Management
* Irrigation Scheduling
* SMS Notification Management
* Alert Management
* Public Information Portal

## Project Structure

```text
waterlevel-management-system
│
├── frontend
├── backend
└── README.md
```

## Future Enhancements

* IoT Sensor Integration
* Mobile Application
* Advanced Analytics Dashboard
* AI-Based Water Level Prediction
* Weather Forecast Integration

## Author

**Vikana Piriyan (Ramu Rathajan)**
Computer Software Engineering Student

## License

This project is developed for educational and research purposes.
