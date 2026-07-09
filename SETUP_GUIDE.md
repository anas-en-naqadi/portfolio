# 🚀 Setup Guide - Next.js Portfolio

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Organize Your Assets

Move your existing assets to the `public` folder:

```bash
# Create directories
mkdir -p public/images public/icons

# Move your files
mv me.png public/images/
mv dark-mode.jpg public/images/
mv light-mode.jpg public/images/
mv CV-PRO.pdf public/
```

## Step 3: Create Missing Assets

### Create Open Graph Image
- Size: 1200x630px
- Save as: `public/images/og-image.jpg`
- Should include your name and title

### Create Favicon
- Generate favicon at: https://realfavicongenerator.net/
- Save files to `public/` directory

## Step 4: Update Configuration

### Update Domain URLs
1. Open `src/app/layout.tsx`
2. Replace `https://yourdomain.com` with your actual domain
3. Update social media links in `src/lib/constants.ts`

### Update Google Verification
1. Set up Google Search Console
2. Get verification code
3. Add to `src/app/layout.tsx` in `metadata.verification.google`

## Step 5: Migrate Your Components

### Option A: Gradual Migration (Recommended)
1. Keep existing `index.html` for reference
2. Create components one by one:
   - Start with `src/components/desktop/DesktopOS.tsx`
   - Then `Window.tsx`, `Taskbar.tsx`, etc.
   - Then mobile components

### Option B: Full Migration
1. Convert HTML to React components
2. Move styles to Tailwind CSS classes
3. Update all paths to use Next.js Image component

## Step 6: Test Locally

```bash
npm run dev
```

Visit http://localhost:3000

## Step 7: Build for Production

```bash
npm run build
npm start
```

## Step 8: Deploy

### Vercel (Recommended)
1. Push code to GitHub
2. Go to vercel.com
3. Import your repository
4. Deploy automatically

### Environment Variables
If needed, create `.env.local`:
```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Step 9: SEO Setup

1. **Google Search Console**
   - Add your site
   - Submit sitemap: `https://yourdomain.com/sitemap.xml`

2. **Bing Webmaster Tools**
   - Add your site
   - Submit sitemap

3. **Test SEO**
   - Use Google's Rich Results Test
   - Check with Lighthouse (Chrome DevTools)

## Step 10: Performance Optimization

1. **Run Lighthouse**
   ```bash
   # In Chrome DevTools > Lighthouse
   # Target: 90+ in all categories
   ```

2. **Optimize Images**
   - Convert to WebP format
   - Use Next.js Image component
   - Add proper alt text

3. **Check Bundle Size**
   ```bash
   npm run build
   # Check .next/analyze for bundle size
   ```

## Troubleshooting

### TypeScript Errors
```bash
npm run type-check
```

### Linting Issues
```bash
npm run lint
```

### Build Errors
- Check Node.js version (need 18+)
- Clear `.next` folder: `rm -rf .next`
- Reinstall: `rm -rf node_modules && npm install`

## Next Steps

1. ✅ Set up project structure
2. ⏳ Migrate components from HTML
3. ⏳ Add animations with Framer Motion
4. ⏳ Implement dark mode
5. ⏳ Add contact form
6. ⏳ Set up analytics
7. ⏳ Deploy to production


