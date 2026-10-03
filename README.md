# VS — E-commerce Landing Page

A premium responsive e-commerce landing page designed for VS, a modern lifestyle brand.

## Overview

VS is a fictional premium lifestyle e-commerce brand created as a frontend UI/UX design project.

The project focuses on:
- Visual design
- Typography
- Responsive layouts
- Product presentation
- Micro-interactions
- User experience

## Features

- Responsive navigation
- Hero section
- Featured product collection
- Product category filtering
- Product Quick View
- Shopping Bag drawer
- Wishlist drawer
- Search interface
- Newsletter interaction
- Editorial section
- Responsive mobile navigation
- Subtle micro-interactions

## Tech Stack

- React
- Vite
- JavaScript
- Tailwind CSS
- Lucide React

## Getting Started

### Prerequisites

Make sure you have Node.js (v18+) and npm installed.

### Installation & Local Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/patrapillivasanthsai/VS-Ecommerce-Landing-Page.git
   cd VS-Ecommerce-Landing-Page
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/          # Reusable UI sections, modals & drawers
│   ├── AnnouncementBar.jsx
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── FeaturedCollection.jsx
│   ├── ProductCard.jsx
│   ├── EditorialSection.jsx
│   ├── BrandValues.jsx
│   ├── Newsletter.jsx
│   ├── Footer.jsx
│   ├── CartDrawer.jsx
│   ├── WishlistDrawer.jsx
│   ├── QuickViewModal.jsx
│   ├── SearchModal.jsx
│   └── Toast.jsx
├── data/               # Product catalog & editorial content data
│   └── products.js
├── App.jsx             # Main composition & global modal state management
├── main.jsx            # React root mounting
└── index.css           # Tailwind CSS directives & custom typography rules
```

## Live Demo

[https://vs-ecommerce-landing-page.vercel.app/](https://vs-ecommerce-landing-page.vercel.app/)

## Design Focus

The interface was designed around:
- Minimalism
- Editorial typography
- Generous whitespace
- Premium product presentation
- Responsive design
- Restrained interactions
