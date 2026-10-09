# 💎 DIAMIVO — Luxury Diamond Jewellery & Education Platform

DIAMIVO is a full-stack e-commerce and gemstone educational platform built with modern web technologies. It features a curated collection of high-end diamond jewellery pieces, an intuitive shopping and order management flow, and an educational suite for diamonds (the 4Cs) and precious gemstones.

---

## 🎨 Visual Identity & Theme
- **Primary Luxury Palette**: Deep Navy Blue (`#0a2540`, `#061827`, `#123e63`), Diamond Silver (`#c8d0d8`, `#eef2f5`), and Champagne Gold (`#c7a45a`).
- **Typography**: Cormorant Garamond (Editorial / Headers) and Inter (Modern UI).

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React.js (Vite)
- **Routing**: React Router DOM (v6)
- **Styling**: Vanilla CSS3 with CSS custom properties
- **Animations**: Framer Motion
- **Icons**: React Icons (Lucide, Feather, Io5)
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Server**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Environment**: dotenv, cors, nodemon

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer)
- [MongoDB](https://www.mongodb.com/) running locally on port `27017`

### 2. Backend Setup
```bash
cd server
npm install
npm run seed     # Seeds 4 categories and 12 luxury products
npm run dev      # Starts Express server on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd ../client
npm install
npm run dev      # Starts Vite client on http://localhost:5173
```

---

## 🌐 API Endpoints

### Products
- `GET /api/products` — Filter, search, and sort products with pagination
- `GET /api/products/featured` — Fetch curated home featured products
- `GET /api/products/category/:category` — Filter products by category slug
- `GET /api/products/:id` — Fetch product by MongoDB ID or slug
- `POST /api/products` — Create new product
- `PUT /api/products/:id` — Update product
- `DELETE /api/products/:id` — Delete product

### Categories
- `GET /api/categories` — List all categories
- `GET /api/categories/slug/:slug` — Get category details by slug
- `GET /api/categories/:id` — Get category by ID
- `POST /api/categories` — Create category
- `PUT /api/categories/:id` — Update category
- `DELETE /api/categories/:id` — Delete category

### Orders
- `POST /api/orders` — Create order (server-side price verification and stock decrement)
- `GET /api/orders` — List all orders
- `GET /api/orders/number/:orderNumber` — Track order by tracking number
- `GET /api/orders/:id` — Get order by ID
- `PATCH /api/orders/:id/status` — Update order status (auto-restores inventory if cancelled)
- `PATCH /api/orders/:id/payment` — Update payment status
- `PATCH /api/orders/:id/cancel` — Cancel order and return items to stock

### Health
- `GET /api/health` — API health check
