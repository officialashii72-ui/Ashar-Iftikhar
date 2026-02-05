# Ashar Iftikhar - AI Business Systems Portfolio

A complete, professional portfolio website with a fully functional admin panel for managing AI automation services.

## 🚀 Project Overview

This is a full-stack portfolio website built for Ashar Iftikhar, showcasing AI automation services including:
- AI Workflow Automation
- Lead Generation Systems
- Content Engines
- API Integrations

## 📁 Project Structure

```
/
├── app/                    # Frontend (React + TypeScript + Tailwind CSS)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React context providers
│   │   ├── layouts/        # Page layouts
│   │   ├── pages/          # Page components
│   │   ├── sections/       # Homepage sections
│   │   ├── services/       # API services
│   │   └── types/          # TypeScript type definitions
│   └── public/
├── server/                 # Backend (Node.js + Express + MongoDB)
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Express middleware
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Utility functions
│   └── uploads/            # File upload directory
└── README.md
```

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **shadcn/ui** - UI components
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Multer** - File uploads
- **bcryptjs** - Password hashing

## ✨ Features

### Public Website
- 🎨 Modern, premium design with smooth animations
- 📱 Fully responsive (mobile, tablet, desktop)
- 🌙 Dark/Light mode toggle
- 🏠 Hero section with animated gradient background
- 🛠️ Interactive AI tools demo (Content Repurposer, LinkedIn Generator)
- 💼 Services showcase with pricing
- 📊 Case studies with real results
- 📝 Blog with search and categories
- 📧 Contact form with validation
- 🔗 Social media links

### Admin Panel
- 🔐 Secure JWT authentication
- 📊 Dashboard with analytics
- 📝 CRUD for Projects
- 💼 CRUD for Services
- 📝 CRUD for Blog Posts
- ⭐ CRUD for Testimonials
- 📧 Contact message management
- 🖼️ Media manager with drag-drop upload
- ⚙️ Site settings configuration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install frontend dependencies:
```bash
cd app
npm install
```

3. Install backend dependencies:
```bash
cd ../server
npm install
```

4. Set up environment variables:

Create `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio_db
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
NODE_ENV=development
ADMIN_EMAIL=admin@ashariftikhar.com
ADMIN_PASSWORD=your_secure_password
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
```

Create `.env` file in the `app` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

5. Start the development servers:

Backend:
```bash
cd server
npm run dev
```

Frontend:
```bash
cd app
npm run dev
```

6. Open your browser:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Admin Panel: http://localhost:5173/admin/login

## 📋 API Endpoints

### Public Routes
- `GET /api/projects` - Get all projects
- `GET /api/services` - Get all services
- `GET /api/blog` - Get blog posts
- `GET /api/testimonials` - Get testimonials
- `POST /api/contact` - Submit contact form
- `GET /api/settings` - Get site settings

### Protected Admin Routes
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/password` - Change password

- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/dashboard/analytics` - Analytics data

- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

- `POST /api/services` - Create service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

- `POST /api/blog` - Create blog post
- `PUT /api/blog/:id` - Update blog post
- `DELETE /api/blog/:id` - Delete blog post

- `POST /api/testimonials` - Create testimonial
- `PUT /api/testimonials/:id` - Update testimonial
- `DELETE /api/testimonials/:id` - Delete testimonial

- `GET /api/contact` - Get contact messages
- `PUT /api/contact/:id/read` - Mark as read
- `PUT /api/contact/:id/reply` - Mark as replied
- `DELETE /api/contact/:id` - Delete message

- `POST /api/admin/upload` - Upload file
- `GET /api/admin/upload` - Get uploaded files
- `DELETE /api/admin/upload/:filename` - Delete file

- `PUT /api/settings` - Update settings

## 🎨 Design System

### Colors
- Primary: #4f46e5 (Indigo)
- Secondary: #0ea5e9 (Sky Blue)
- Accent: #f59e0b (Amber)
- Background: Light/Dark modes
- Text: Dark gray on white

### Typography
- Headings: Inter, 700 weight
- Body: Inter, 400 weight
- Code: Fira Code

## 📝 Database Schema

### Collections
1. **Users** - Admin accounts
2. **Projects** - Portfolio projects/case studies
3. **Services** - Service offerings
4. **BlogPosts** - Blog articles
5. **Testimonials** - Client testimonials
6. **ContactMessages** - Contact form submissions
7. **SiteSettings** - Website configuration

## 🚀 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy

### Backend (Railway/Render)
1. Push code to GitHub
2. Connect repository to Railway/Render
3. Set environment variables
4. Deploy

### Database (MongoDB Atlas)
1. Create cluster on MongoDB Atlas
2. Get connection string
3. Add to environment variables

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- Input validation with express-validator
- CORS configuration
- Helmet for security headers
- File upload validation

## 📄 License

MIT License - feel free to use this project as a template for your own portfolio.

## 👤 Author

**Ashar Iftikhar**
- AI Business Systems Builder
- Building towards ₹1 Crore in 9 months
- Specializing in n8n, API integrations, and AI automation

## 📞 Contact

- Email: ashar@ashariftikhar.com
- Website: https://ashariftikhar.com
- LinkedIn: https://linkedin.com/in/ashariftikhar
- GitHub: https://github.com/ashariftikhar
