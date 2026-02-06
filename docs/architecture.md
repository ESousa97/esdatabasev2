# Architecture Overview

## 🏗️ High-Level Architecture

```
Next.js (Pages Router)
 ├── pages/ (routing layer)
 ├── src/components/ (UI components)
 ├── src/contexts/ (theme + global state)
 ├── src/hooks/ (custom hooks)
 ├── src/styles/ (design tokens + theme)
 └── src/utils/ (shared utilities)
```

## 🔐 Authentication Flow

- NextAuth.js handles OAuth for Google and Azure AD
- Allowed emails are validated using `ALLOWED_EMAILS`
- Tokens are stored in NextAuth session

## 🎨 Design System

- Centralized tokens in `src/styles/tokens.js`
- MUI theme in `src/styles/theme.js`
- Components follow consistent color + spacing conventions

## 📡 API Integration

- Backend API configured via `NEXT_PUBLIC_API_URL`
- Axios requests handled in utility functions
- Error handling via `handleApiError`
