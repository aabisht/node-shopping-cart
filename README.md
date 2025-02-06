# Shopping Cart Application

This is a **Node.js** shopping cart application with **user authentication, cart management, persistent storage using MongoDB, and real-time updates via WebSockets**. The frontend is built using **EJS templates**.

## Features

**User Authentication** (JWT-based registration & login)  
**Product List Page** (Displays product name, image, price, category and add to cart button)  
**Cart Management** (List cart products, update products quantity, remove product from cart)  
**Live Cart Updates** (WebSockets for real-time cart updates)  
**Persistent Storage** (MongoDB for storing users & cart data)  
**Secure API Routes** (Protected endpoints using authentication middleware)  
**Frontend UI** (EJS templates for user interaction)  
**Unit Tests** (Jest & Supertest for testing API routes)

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v18+)
- **MongoDB** (local or cloud via MongoDB Atlas)
- **Postman** (for testing API endpoints)

### Installation

**Clone the repository**

```sh
git clone https://github.com/aabisht/node-shopping-cart.git
cd node-shopping-cart
```

**Install dependencies**

```sh
npm install
```

**Create a `.env` file** in the project root and add:

```ini
PORT=3000
MONGO_URI=mongodb://localhost:27017/shopping-cart
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
PAGE_ITEMS=12
SHIPPING_CHARGES=100
```

**Start MongoDB (if running locally)**

```sh
mongod
```

**Run the server**

```sh
npm run dev
```

**Access the app in the browser**

```
http://localhost:3000
```

## API Endpoints

### Authentication Routes

| Method | Endpoint             | Description                    |
| ------ | -------------------- | ------------------------------ |
| `POST` | `/api/auth/register` | Register a new user            |
| `POST` | `/api/auth/login`    | User login & receive JWT token |

### Product Routes

| Method | Endpoint             | Description                       |
| ------ | -------------------- | --------------------------------- |
| `GET`  | `/api/products`      | Fetch all products                |
| `GET`  | `/api/products/:sku` | Fetch a product with provided sku |
| `POST` | `/api/products`      | Add a product to database         |

### Cart Routes

| Method   | Endpoint                | Description                                   |
| -------- | ----------------------- | --------------------------------------------- |
| `POST`   | `/api/cart/add`         | Add an item to the cart                       |
| `PUT`    | `/api/cart/update/:sku` | Update item quantity of a product in the cart |
| `DELETE` | `/api/cart/remove/:sku` | Remove an item from the cart                  |
| `GET`    | `/api/cart`             | Get the user's cart                           |

## Testing

**Run Jest tests**

```sh
npm run test
```

## Folder Structure

```
node-shopping-cart/
│-- src/
│   │-- config/           # Configuration for DB and socket
│   │-- controllers/      # Route handlers
│   │-- middleware/       # Authentication middleware
│   │-- models/           # Mongoose models
│   │-- public/           # Static assets (CSS, JS)
│   │-- routes/           # Express routes
│   │-- tests/            # Test cases for route controller
│   │-- utils/            # Common function
│   │-- views/            # EJS frontend templates
│-- app.js                # App file to define middleware, routes
│-- server.js             # Main server file
│-- .env                  # Environment variables
│-- package.json          # Dependencies & scripts
│-- README.md             # Documentation
```

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB & Mongoose
- **Authentication:** JWT (JSON Web Token)
- **Frontend:** EJS Templates, Bootstrap
- **Real-Time Updates:** WebSockets (Socket.io)
- **Testing:** Jest, Supertest
- **API Client:** Postman

## Contributors

**Arun Bisht** – _Developer_  
**GitHub:** [aabisht](https://github.com/aabisht)
