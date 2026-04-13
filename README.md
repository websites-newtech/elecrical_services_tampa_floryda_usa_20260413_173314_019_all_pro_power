# All-Pro Power — Website

**Tampa Bay Electrical Services**
Licensed contractor serving Hillsborough, Pinellas, Polk, Pasco, Manatee & Sarasota counties.

---

## Project Structure

```
website/
├── index.html              ← Homepage
├── services.html           ← Electrical services list
├── contact.html            ← Contact form & info
├── assets/
│   ├── css/
│   │   └── main.css        ← All styles
│   ├── js/
│   │   └── main.js         ← Scroll animations, interactions
│   └── images/
│       ├── hero_001.jpg    ← Homepage hero background
│       ├── hero_002.jpg    ← Services page hero background
│       ├── hero_003.jpg    ← Contact page hero background
│       └── image_001.png   ← Service area map image
├── design_decisions.md     ← Design rationale
└── README.md               ← This file
```

---

## Deployment Options

### Option 1: GitHub Pages (Free, Recommended)

1. Create a new GitHub repository
2. Upload the entire `website/` folder contents to the repository root
3. Go to Settings → Pages → Source: `main` branch, `/ (root)` folder
4. Click Save — your site is live at `https://yourusername.github.io/repo-name`

**Custom domain:**
1. Add a `CNAME` file to the root with: `allpropower.com`
2. In your domain registrar, add DNS records:
   - `A` record: `185.199.108.153` (and 109, 110, 111)
   - Or `CNAME`: `yourusername.github.io`

### Option 2: Netlify (Free tier, recommended for forms)

1. Go to [netlify.com](https://netlify.com) → New Site
2. Drag & drop the `website/` folder
3. Site is live instantly with HTTPS

**For contact form to work with Netlify Forms:**
Add to your `<form>` tag: `data-netlify="true"` and `name="contact"`
Then remove the Alpine.js form action and let Netlify handle submission.

### Option 3: Traditional Web Host (cPanel / FTP)

1. Connect via FTP (FileZilla, etc.)
2. Upload all files to `public_html/` directory
3. Ensure `index.html` is at the root

---

## Contact Form

The current form uses `mailto:` as a fallback (no backend required).

**For a full working backend form, choose one of:**

### A) Netlify Forms (easiest)
Add `data-netlify="true"` to `<form>` and change the button to a standard submit.

### B) Formspree.io
1. Sign up at [formspree.io](https://formspree.io)
2. Create a form — get your endpoint URL
3. Change `action="mailto:..."` to `action="https://formspree.io/f/YOUR_ID"`
4. Change `method="POST"` (already set)
5. Remove Alpine.js submit handler (or keep for validation only)

### C) EmailJS (JavaScript, no backend)
1. Sign up at [emailjs.com](https://emailjs.com)
2. Follow their setup guide
3. Replace the `submitForm()` function in `contact.html` with EmailJS send

---

## Images Required

Place these images in `assets/images/`:

| File | Used On | Recommended |
|------|---------|-------------|
| `hero_001.jpg` | Homepage hero | Electrician at work, dark dramatic lighting |
| `hero_002.jpg` | Services page hero | Electrical panel / wiring close-up |
| `hero_003.jpg` | Contact page hero | Professional portrait of Ian, or team photo |
| `image_001.png` | Services page area map | Service area Google Maps screenshot |

**Optimal sizes:**
- Hero images: 1600×900px (16:9), compressed to <300KB (use [Squoosh](https://squoosh.app))
- Map image: 600×500px, PNG

---

## Quick Customization Guide

### Change phone number
Search & replace `8134559472` and `(813) 455-9472` across all HTML files.

### Change email
Search & replace `Ian@all-propower.com` across all HTML files and in `contact.html` JS.

### Change colors
Edit in `assets/css/main.css` under `:root`:
```css
--color-accent:       #f0a500;  /* Change to your brand color */
--color-accent-hover: #d4920a;  /* Slightly darker version */
```

### Add Google Analytics
Paste your GA4 snippet before `</head>` in all HTML files.

### Add business hours
Edit the footer or contact page to include hours using `<time>` elements.

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS 14+)
- Chrome for Android

---

## Technologies Used

| Tech | Purpose | Version |
|------|---------|---------|
| HTML5 | Structure | — |
| CSS3 | Styling + animations | — |
| Alpine.js | Interactivity (menu, form) | 3.x |
| Bebas Neue | Display / heading font | — |
| Source Sans 3 | Body font | — |
| Google Fonts | Font hosting | — |

No build step required. No Node.js. No npm. Just open `index.html`.

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 95+ |
| Lighthouse Accessibility | 100 |
| First Contentful Paint | <1.5s |
| Largest Contentful Paint | <2.5s |

---

## Support & Handoff

For questions about this website, the code is clean, commented, and structured for easy handoff to any developer. Every component is self-contained in semantic HTML with BEM-style class names.

**Built with:** Emil Design Engineering standards — animations, accessibility, and production-grade code.