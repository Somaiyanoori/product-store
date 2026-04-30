# Product Store App

A full-featured product store built with React, demonstrating three different state management approaches: Context API + useReducer, Redux Toolkit, and React Query.

---

## Features

### Product Browsing

- Product list fetched from DummyJSON API
- Loading skeleton screens while fetching
- Error handling with retry option
- Product detail page with image gallery
- Customer reviews display
- Category filtering
- Search functionality
- Sort by price, name, or rating
- Grid and list view modes

### Shopping Cart (Redux Toolkit)

- Add items to cart
- Remove items from cart
- Increase and decrease quantity
- Clear entire cart
- Total items count
- Total price calculation
- Order summary with shipping and tax
- Cart persisted in localStorage

### App Settings (Context API + useReducer)

- Dark mode and light mode toggle
- Grid view and list view toggle
- Category selection
- Sort preference
- Search query
- Reset filters
- Theme and view mode persisted in localStorage

### Data Fetching (React Query)

- Products list with caching
- Single product detail with caching
- Categories list with caching
- Product search with caching
- Proper query keys
- Stale time and garbage collection configuration

---

## Tools and Libraries

| Library              | Version   | Purpose                          |
| -------------------- | --------- | -------------------------------- |
| React                | 18.3.x    | UI framework                     |
| Vite                 | 5.4.x     | Build tool                       |
| Tailwind CSS         | 3.x (CDN) | Styling                          |
| React Router DOM     | 6.26.x    | Client-side routing              |
| Redux Toolkit        | 2.3.x     | Cart state management            |
| React Redux          | 9.1.x     | Redux bindings for React         |
| TanStack React Query | 5.56.x    | Server data fetching and caching |
| react-hot-toast      | 2.4.x     | Toast notifications              |
| react-icons          | 5.3.x     | Icon library                     |

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   ├── ProductList.jsx
│   ├── CartItem.jsx
│   ├── SettingsPanel.jsx
│   ├── LoadingSkeleton.jsx
│   └── Toast.jsx
├── context/
│   └── AppContext.jsx
├── store/
│   ├── index.js
│   └── cartSlice.js
├── pages/
│   ├── HomePage.jsx
│   ├── CartPage.jsx
│   └── ProductDetailPage.jsx
├── hooks/
│   └── useProducts.js
├── App.jsx
├── main.jsx
└── index.css
```

---

## State Management Architecture

### Context API + useReducer

**Used for:** App-wide UI settings that many components read but rarely change.

Manages: theme, view mode, selected category, sort order, search query.

Why: These are simple UI preferences that do not require the overhead of Redux. Context avoids prop drilling, and useReducer keeps state updates predictable.

### Redux Toolkit

**Used for:** Shopping cart state that is modified frequently from multiple components.

Manages: cart items, quantities, adding, removing, clearing.

Why: The cart has complex update logic (find item, update quantity, calculate totals) and is accessed from the navbar, product cards, product detail page, and cart page. Redux Toolkit provides structured, scalable state management with built-in immutability via Immer.

### React Query

**Used for:** Server data that comes from the DummyJSON API.

Manages: product lists, single product details, categories, search results.

Why: API data needs caching, background refetching, loading states, error handling, and retry logic. React Query handles all of this automatically without manual state management.

---

## Steps to Run

### 1. Clone the repository

```bash
git clone https://github.com/Somaiyanoori/product_store.git
cd product-store
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Open in browser

```
http://localhost:5173
```

---

## API

This project uses [DummyJSON](https://dummyjson.com/products), a free REST API with 194 products across 36 categories.

### Endpoints Used

| Endpoint                         | Description                   |
| -------------------------------- | ----------------------------- |
| `GET /products`                  | All products                  |
| `GET /products/{id}`             | Single product by ID          |
| `GET /products/category-list`    | All category names            |
| `GET /products/category/{name}`  | Products filtered by category |
| `GET /products/search?q={query}` | Search products by keyword    |
