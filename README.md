
# School Website with eLibrary

### [**View Demo**](http://129.154.243.254:3000)
- **Admin Panel**: `/admin`
- **E-Library**: `/elibrary`
- **Login**: `/login`

### Demo Credentials
- **Admin User**:
  Username: `admin`
  Password: `adminadmin`

- **Regular User**:
  Username: `user`
  Password: `useruser`

---

## Project Overview

This project is a **school website** that provides a **dynamic eLibrary**, allowing the admin to manage books, news, and teachers. Admins can also add and manage users, ensuring that only valid users have access to view books in the library.

---

## Features

- **Dynamic eLibrary**:
  Admins can upload, manage, and organize books, including setting up book titles, authors, genres, and access rules.

- **Search Functionality**:
  Users can search for books using multiple filters like title, author, genre, tags, and language.

- **User Management**:
  Admins can manage users, ensuring that only authorized users can access the eLibrary.

- **Admin Panel**:
  A dedicated panel for admins to manage books, users, and settings.

- **Authentication & Authorization**:
  Admin and user roles with Next.js API-based authentication and authorization using **NextAuth.js**.

- **Modern UI**:
  The application features a sleek dark-mode theme using **Tailwind CSS**, along with animated transitions using **Framer Motion**.

- **Mobile-Friendly**:
  Responsive design optimized for both mobile and desktop views.

- **Book View and Download**:
  Users can view books' details and download them, provided they are authorized.

---

## Tech Stack

- **Frontend**:
  - **Next.js (App Router)**
  - **React**
  - **Tailwind CSS**
  - **Radix UI** (for UI components)
  - **Framer Motion** (for animations)
  - **AOS** (for scroll-based animations)
  - **Fuse.js** (for search functionality)

- **Backend**:
  - **Next.js API Routes**
  - **MongoDB** (for storing books, users, and other data)
  - **NextAuth.js** (for authentication and session management)
  - **bcryptjs** (for password hashing)
  - **JWT** (for secure token generation)

---

## Setup Instructions

### Prerequisites

- Node.js
- MongoDB instance (local or cloud)

### Steps

1. **Clone the repository:**

    ```bash
    git clone https://github.com/rozeen-shrestha/school-backend.git
    cd school-backend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up MongoDB:**

    Configure your MongoDB connection by creating a `.env.local` file in the root directory and adding your MongoDB URI:

    ```
    MONGODB_URI=your_mongo_db_uri
    ```

4. **Run the development server:**

    ```bash
    npm run dev
    ```

5. **Access the site:**
   - Admin Panel: `http://localhost:3000/admin`
   - E-Library: `http://localhost:3000/elibrary`
   - Login: `http://localhost:3000/login`

---

## Features Checklist

- [x] Admin Panel for managing users and books
- [x] User Registration and Login System
- [x] Book Search and Categorization
- [x] Only valid users can access the eLibrary
- [x] Mobile-friendly interface
- [x] Admin can upload book cover images and PDFs
- [x] Manage book genres, languages, and tags
- [x] Authentication and authorization with NextAuth.js
- [x] Secure book download for authorized users only
- [x] Modern dark mode UI with Tailwind CSS and Radix UI

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
