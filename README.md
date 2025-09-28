# Frontend V1 - Casinade

A modern Next.js application for the Casinade online casino platform with a complete layout system, API integration, and icon support.

## Features

- 🎨 **Complete Layout System**: Header, Navbar, Footer, and Main Content components
- 🔌 **API Integration**: Axios-based API services for backend communication
- 🎯 **Icon Support**: Iconify integration for beautiful icons
- 🖼️ **Image Handling**: Utility functions for image optimization and loading
- 🎨 **Modern UI**: Tailwind CSS with custom color scheme
- 📱 **Responsive Design**: Mobile-first approach with responsive components
- 🔐 **Authentication Ready**: Built-in auth state management

## Project Structure

```
src/
├── apis/                 # API services
│   ├── config.ts        # Axios configuration
│   ├── auth.ts          # Authentication API
│   ├── games.ts         # Games API
│   └── user.ts          # User API
├── components/          # React components
│   ├── Header.tsx       # Header component
│   ├── Navbar.tsx       # Navigation component
│   ├── Footer.tsx       # Footer component
│   ├── MainContent.tsx  # Main content wrapper
│   └── Layout.tsx       # Main layout component
├── utils/               # Utility functions
│   └── images.ts        # Image handling utilities
└── app/                 # Next.js app directory
    ├── globals.css      # Global styles
    ├── layout.tsx       # Root layout
    └── page.tsx         # Home page
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env.local
```

3. Update environment variables in `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_IMAGE_BASE_URL=http://localhost:3001
```

4. Start development server:
```bash
npm run dev
```

## Components Usage

### Layout Component

The main `Layout` component wraps your entire application:

```tsx
import Layout from '@/components/Layout';

export default function MyPage() {
  return (
    <Layout showHeader={true} showNavbar={true} showFooter={true}>
      <div>Your page content</div>
    </Layout>
  );
}
```

### Individual Components

You can also use components individually:

```tsx
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MainContent from '@/components/MainContent';

export default function CustomLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />
      <Navbar isAuthenticated={!!user} />
      <MainContent>
        <div>Your content</div>
      </MainContent>
      <Footer />
    </div>
  );
}
```

## API Services

### Authentication

```tsx
import { authAPI } from '@/apis/auth';

// Login
const response = await authAPI.login({
  email: 'user@example.com',
  password: 'password'
});

// Register
const response = await authAPI.register({
  email: 'user@example.com',
  password: 'password',
  firstName: 'John',
  lastName: 'Doe'
});
```

### Games

```tsx
import { gamesAPI } from '@/apis/games';

// Get all games
const games = await gamesAPI.getGames();

// Get game by category
const slotGames = await gamesAPI.getGamesByCategory('slots');
```

### User Profile

```tsx
import { userAPI } from '@/apis/user';

// Get user profile
const profile = await userAPI.getProfile();

// Update profile
const updatedProfile = await userAPI.updateProfile({
  firstName: 'Jane',
  lastName: 'Smith'
});
```

## Icons

Icons are provided by Iconify. Use them with the `Icon` component:

```tsx
import { Icon } from '@iconify/react';

<Icon icon="mdi:home" className="w-6 h-6" />
<Icon icon="mdi:dice-6" className="w-8 h-8 text-primary-yellow" />
```

## Image Handling

Use the image utilities for optimized image loading:

```tsx
import { getImageUrl, useImageLoader } from '@/utils/images';

// Get optimized image URL
const imageUrl = getImageUrl('/images/game.jpg', '/images/placeholder.jpg');

// Use image loader hook
const { isLoading, hasError } = useImageLoader('/images/game.jpg');
```

## Styling

The project uses Tailwind CSS with custom color variables:

- `--background`: #182641 (Dark blue background)
- `--foreground`: #ffffff (White text)
- `--primary-yellow`: #E0FE08 (Accent yellow)
- `--primary-lavendar`: #97B9FF (Lavender blue)
- `--primary-dark`: #0C1423 (Dark navy)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Pages

1. Create a new file in `src/app/` directory
2. Export a default component
3. The layout will be automatically applied

### Adding New API Endpoints

1. Create or update files in `src/apis/` directory
2. Use the configured `apiClient` from `config.ts`
3. Export functions for easy importing

## Contributing

1. Follow the existing code structure
2. Use TypeScript for type safety
3. Follow the established naming conventions
4. Test your changes thoroughly

## License

This project is part of the Casinade platform.