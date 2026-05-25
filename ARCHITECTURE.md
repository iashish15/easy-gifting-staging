# EasyGifting MERN E-Commerce Architecture

## Project Overview

A complete production-ready e-commerce platform for premium gifting with dynamic admin-controlled frontend.

## Tech Stack

- **Frontend**: React 18 + Vite + TypeScript + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express.js + MongoDB + Mongoose
- **Authentication**: JWT + bcryptjs
- **State Management**: Redux Toolkit
- **Image Upload**: Cloudinary
- **UI Components**: Custom components with Tailwind

## Architecture Principles

- **Separation of Concerns**: Clear boundaries between frontend, backend, and admin
- **Scalability**: Modular components and API design
- **Security**: JWT, input validation, rate limiting
- **Dynamic Content**: Admin controls all frontend content
- **Mobile-First**: Responsive design across all devices

## Folder Structure

```
easy-gifting/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── uploads/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── utils/
│   │   └── App.tsx
│   ├── public/
│   └── vite.config.ts
├── admin/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── App.tsx
│   └── vite.config.ts
└── shared/
    ├── types/
    └── constants/
```

## Database Collections

- users
- admins
- products
- categories
- brands
- orders
- carts
- wishlists
- coupons
- reviews
- banners
- homepageSections
- notifications
- settings

## API Endpoints Structure

- `/api/auth/*` - Authentication
- `/api/admin/*` - Admin operations
- `/api/products/*` - Product management
- `/api/categories/*` - Category management
- `/api/brands/*` - Brand management
- `/api/orders/*` - Order management
- `/api/users/*` - User management
- `/api/cms/*` - Content management

## Authentication Flow

1. User registers/logs in
2. JWT token issued
3. Token stored in localStorage
4. Axios interceptor adds token to requests
5. Protected routes check token validity
6. Automatic token refresh

## Dynamic CMS Flow

1. Admin updates content via dashboard
2. Data saved to MongoDB
3. Frontend fetches data on page load
4. Components render based on admin data
5. Real-time updates via polling/WebSocket (future)

## Security Features

- JWT authentication
- Password hashing with bcrypt
- Input validation with Joi
- Rate limiting
- CORS configuration
- Helmet for security headers
- File upload validation

## Deployment Structure

- Frontend: Vercel/Netlify
- Backend: Railway/Render/Heroku
- Database: MongoDB Atlas
- Images: Cloudinary
- Monitoring: Sentry/LogRocket
