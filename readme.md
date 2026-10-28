# Restaurant Management System — Frontend

A responsive React.js frontend for a Restaurant Management System built with React, Vite, Axios, and CSS. It communicates with a Spring Boot REST API to manage restaurants and their food items.

## Features

- Create new restaurants.
- View all restaurants and their IDs.
- Delete restaurants.
- Add food items to selected restaurants.
- View all food items.
- Filter food items by restaurant ID.
- Display food item prices and quantities.
- Show success and error messages.
- Refresh restaurant and food item lists.

## Technologies Used

- React.js
- JavaScript
- Vite
- Axios
- CSS
- Spring Boot REST APIs
- Git and GitHub

## Project Structure

```text
Spring_boot_Crud_operation_Restaurant_fronend/
├── public/
├── src/
│   ├── assets/
│   ├── App.css
│   ├── App.jsx
│   ├── api.js
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

## Prerequisites

Install the following tools:

- Node.js
- npm
- Git
- A running Spring Boot backend

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/UdayaChandra-36/Spring_boot_Crud_operation_Restaurant_fronend.git
cd Spring_boot_Crud_operation_Restaurant_fronend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the backend connection

The `src/api.js` file configures Axios to connect to the Spring Boot backend:

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9394",
});

export default api;
```

Ensure the backend is running on port `9394`. If your backend uses another port, update the `baseURL` accordingly.

### 4. Start the frontend

```bash
npm run dev
```

Open the URL shown in your terminal. The default Vite development URL is usually:

http://localhost:5173

## API Integration

The frontend communicates with the following backend endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/restaurant/GetAllRest` | Retrieve all restaurants |
| POST | `/restaurant/CreateRest` | Create a restaurant |
| DELETE | `/restaurant/Delres/{id}` | Delete a restaurant |
| POST | `/FoodItems/Create` | Create a food item |
| GET | `/FoodItems/getfooditem` | Retrieve all food items |
| GET | `/FoodItems/getfooditemsbyid/{id}` | Retrieve food items by restaurant ID |

## Configuration Notes

- The Spring Boot backend must be running for API operations to work.
- The backend must allow requests from the frontend origin through CORS.
- The current API URL is configured for local development.
- For deployment, configure the API URL to point to the hosted backend.

## Future Enhancements

- Update and delete food items.
- Search and sort food items.
- Add form validation.
- Implement authentication and authorization.
- Deploy the frontend and backend.

## Author

**Udaya Chandra**
