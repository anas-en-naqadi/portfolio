# 🌍 Multi-Language Portfolio Setup

## ✅ What's Been Implemented

### 1. **Internationalization (i18n)**
- ✅ Integrated `next-intl` for 3 languages: English, French, Arabic
- ✅ Automatic locale detection and routing
- ✅ RTL (Right-to-Left) support for Arabic
- ✅ Language switcher component

### 2. **Real Data from CV**
- ✅ Extracted all data from `CV-PRO.pdf`
- ✅ Updated personal information, education, experience, projects, and skills
- ✅ Real LinkedIn and GitHub links

### 3. **Responsive Design**
- ✅ **Mobile** (< 768px): Native mobile OS interface
- ✅ **Tablet** (768px - 1023px): Optimized desktop view
- ✅ **Desktop** (> 1024px): Full desktop OS experience

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

The app will be available at:
- English: `http://localhost:3000/en`
- French: `http://localhost:3000/fr`
- Arabic: `http://localhost:3000/ar`

## 📁 Project Structure

```
src/
├── app/
│   ├── [locale]/          # Locale-based routing
│   │   ├── layout.tsx      # Locale layout with RTL support
│   │   └── page.tsx        # Main page
│   └── layout.tsx          # Root layout
├── components/
│   ├── desktop/            # Desktop OS components
│   ├── mobile/             # Mobile OS components
│   └── shared/             # Shared components (LanguageSwitcher, etc.)
├── i18n/
│   ├── messages/           # Translation files
│   │   ├── en.json
│   │   ├── fr.json
│   │   └── ar.json
│   ├── config.ts           # Locale configuration
│   ├── routing.ts          # Routing configuration
│   └── request.ts          # Request configuration
├── lib/
│   └── data.ts             # Real portfolio data from CV
└── styles/
    └── globals.css         # Global styles with RTL support
```

## 🌐 Language Support

### English (en)
- Default language
- LTR (Left-to-Right) layout

### French (fr)
- Complete French translations
- LTR layout

### Arabic (ar)
- Complete Arabic translations
- RTL (Right-to-Left) layout
- Arabic font support

## 📱 Responsive Breakpoints

- **Mobile**: < 768px → Mobile OS interface
- **Tablet**: 768px - 1023px → Desktop OS with optimizations
- **Desktop**: > 1024px → Full Desktop OS

## 🎨 Features

### Desktop View
- Draggable windows
- Start menu
- Taskbar
- Desktop icons
- Language switcher (top right)

### Mobile View
- Bottom navigation
- App cards
- Swipe gestures
- Language switcher in menu

### Tablet View
- Optimized window sizes
- Touch-friendly controls
- Responsive grid layouts

## 📝 Adding New Translations

1. Add the key to all three language files:
   - `src/i18n/messages/en.json`
   - `src/i18n/messages/fr.json`
   - `src/i18n/messages/ar.json`

2. Use in components:
```tsx
import { useTranslations } from 'next-intl'

const t = useTranslations()
const text = t('common.about')
```

## 🔧 Configuration

### Adding a New Language

1. Add locale to `src/i18n/config.ts`:
```ts
export const locales = ['en', 'fr', 'ar', 'es'] as const
```

2. Create translation file: `src/i18n/messages/es.json`

3. Update `src/i18n/routing.ts`:
```ts
export const routing = defineRouting({
  locales: ['en', 'fr', 'ar', 'es'],
  defaultLocale: 'en',
})
```

## 🚀 Deployment

The app is ready for deployment on:
- **Vercel** (recommended)
- **Netlify**
- **Any Node.js hosting**

All routes are automatically generated for each locale.

## 📄 License

MIT


