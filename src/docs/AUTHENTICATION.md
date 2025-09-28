# Authentication System Documentation

This document explains how to use the authentication system in the frontend_v1 application.

## Overview

The authentication system provides:
- Global authentication state management
- Login and registration functionality
- Protected routes and guards
- User profile management
- Automatic token handling

## Architecture

### Components

1. **AuthContext** - Global authentication state and actions
2. **AuthProvider** - Context provider that wraps the app
3. **Custom Hooks** - Easy-to-use hooks for authentication
4. **Guards** - Components for protecting routes
5. **Pages** - Login, register, and profile pages

### File Structure

```
src/
├── contexts/
│   ├── AuthContext.tsx      # Main authentication context
│   └── index.ts            # Context exports
├── hooks/
│   ├── useAuth.ts          # Authentication hooks
│   └── index.ts            # Hook exports
├── components/
│   ├── AuthGuard.tsx       # Authentication guard
│   ├── GuestGuard.tsx      # Guest-only guard
│   └── ProtectedRoute.tsx  # Protected route wrapper
└── app/
    ├── login/page.tsx      # Login page
    ├── register/page.tsx   # Registration page
    └── profile/page.tsx    # User profile page
```

## Usage

### 1. Basic Authentication

```tsx
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.firstName}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={() => login({ email: 'user@example.com', password: 'password' })}>
          Login
        </button>
      )}
    </div>
  );
}
```

### 2. Protected Routes

```tsx
import ProtectedRoute from '@/components/ProtectedRoute';

function MyProtectedPage() {
  return (
    <ProtectedRoute>
      <div>This content is only visible to authenticated users</div>
    </ProtectedRoute>
  );
}
```

### 3. Guest-Only Routes

```tsx
import GuestGuard from '@/components/GuestGuard';

function LoginPage() {
  return (
    <GuestGuard>
      <div>This content is only visible to guests (non-authenticated users)</div>
    </GuestGuard>
  );
}
```

### 4. Using Specific Hooks

```tsx
import { useLogin, useRegister, useUser } from '@/hooks/useAuth';

function LoginForm() {
  const { login, isLoggingIn, error, clearError } = useLogin();
  const { user } = useUser();

  const handleSubmit = async (formData) => {
    try {
      await login(formData);
      // User is now logged in
    } catch (err) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      {error && <div className="error">{error}</div>}
      <button disabled={isLoggingIn}>
        {isLoggingIn ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

## API Integration

### Authentication API

The authentication system integrates with the following API endpoints:

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/refresh` - Refresh token

### User API

- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `PUT /api/user/password` - Change password
- `POST /api/user/avatar` - Upload avatar
- `GET /api/user/balance` - Get user balance

## State Management

### AuthContext State

```typescript
interface AuthContextType {
  // State
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  clearError: () => void;

  // Status
  isLoggingIn: boolean;
  isRegistering: boolean;
}
```

### User Profile Type

```typescript
interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  balance: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}
```

## Features

### 1. Automatic Token Management

- Tokens are automatically stored in localStorage
- Tokens are included in API requests via axios interceptors
- Automatic logout on token expiration

### 2. Error Handling

- Global error state for authentication errors
- User-friendly error messages
- Automatic error clearing on user interaction

### 3. Loading States

- Global loading state during authentication checks
- Individual loading states for login/register actions
- Loading indicators in UI components

### 4. Route Protection

- `AuthGuard` - Protects routes requiring authentication
- `GuestGuard` - Protects routes for guests only
- `ProtectedRoute` - Wrapper component for protected routes

### 5. Auto-refresh

- User profile is automatically refreshed every 5 minutes
- Token refresh functionality
- Seamless user experience

## Security Features

### 1. Token Security

- Tokens are stored in localStorage (consider httpOnly cookies for production)
- Automatic token cleanup on logout
- Token validation on app startup

### 2. Route Security

- Server-side route protection
- Client-side route guards
- Automatic redirects for unauthorized access

### 3. Input Validation

- Form validation on client side
- Server-side validation via API
- Error handling and user feedback

## Best Practices

### 1. Error Handling

```tsx
const { login, error, clearError } = useLogin();

// Clear errors when user starts typing
const handleInputChange = (e) => {
  if (error) clearError();
  // Handle input change
};
```

### 2. Loading States

```tsx
const { isLoggingIn } = useLogin();

<button disabled={isLoggingIn}>
  {isLoggingIn ? 'Logging in...' : 'Login'}
</button>
```

### 3. Protected Content

```tsx
const { isAuthenticated, user } = useAuth();

return (
  <div>
    {isAuthenticated ? (
      <div>Welcome, {user?.firstName}!</div>
    ) : (
      <div>Please log in to view this content</div>
    )}
  </div>
);
```

## Troubleshooting

### Common Issues

1. **"useAuth must be used within an AuthProvider"**
   - Make sure your component is wrapped with `AuthProvider`
   - Check that `AuthProvider` is in the component tree

2. **Authentication not persisting**
   - Check if localStorage is available
   - Verify token is being stored correctly
   - Check API endpoints are working

3. **Infinite loading**
   - Check API endpoints are responding
   - Verify token format and validity
   - Check network connectivity

### Debug Mode

Enable debug logging by adding to your environment:

```env
NEXT_PUBLIC_DEBUG_AUTH=true
```

## Migration Guide

### From Basic State to AuthProvider

1. Wrap your app with `AuthProvider`
2. Replace local state with `useAuth` hook
3. Update API calls to use the provided functions
4. Add error handling and loading states

### Example Migration

**Before:**
```tsx
const [user, setUser] = useState(null);
const [isLoading, setIsLoading] = useState(true);

const handleLogin = async (credentials) => {
  const response = await authAPI.login(credentials);
  setUser(response.user);
};
```

**After:**
```tsx
const { user, isLoading, login } = useAuth();

// login function is already provided with error handling
```

## Future Enhancements

- [ ] Two-factor authentication
- [ ] Social login integration
- [ ] Remember me functionality
- [ ] Session management
- [ ] Role-based access control
- [ ] Password strength validation
- [ ] Account verification flow
