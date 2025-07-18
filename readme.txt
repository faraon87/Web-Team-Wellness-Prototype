# Team Welly - Web Prototype

A responsive web prototype of the Team Welly mobile wellness platform, built with React and Tailwind CSS.

## 🚀 Live Demo

Visit the live prototype: [https://faraon87.github.io/Team-Wellness-Web-Prototype](https://faraon87.github.io/Team-Wellness-Web-Prototype)

## 📱 Features

- **Authentic Team Welly Branding**: Real lotus flower logo and teal color scheme
- **Multiple Login Flows**: Individual, Employee, and Employer access paths
- **SSO Integration**: Google, Apple, and X sign-in options
- **Responsive Design**: Mobile-first approach with clean, modern UI
- **Custom Typography**: Supports Sensa Wild Fill font (when hosted)

## 🛠️ Tech Stack

- **React 18** - Component-based UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **GitHub Pages** - Static site hosting

## 📁 Project Structure

```
Team-Wellness-Web-Prototype/
├── public/
│   ├── fonts/                 # Place your Sensa Wild Fill fonts here
│   │   ├── SensaWild-Fill.woff2
│   │   └── SensaWild-Fill.woff
│   └── index.html
├── src/
│   ├── App.js                 # Main application component
│   ├── index.js               # React entry point
│   └── index.css              # Global styles and fonts
├── package.json               # Dependencies and scripts
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

## 🔧 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/faraon87/Team-Wellness-Web-Prototype.git
cd Team-Wellness-Web-Prototype
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Add Your Custom Fonts
1. Create the fonts directory: `public/fonts/`
2. Copy your font files:
   - `SensaWild-Fill.woff2`
   - `SensaWild-Fill.woff`

### 4. Run the Development Server
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### 5. Build for Production
```bash
npm run build
```

### 6. Deploy to GitHub Pages
```bash
npm run deploy
```

## 🎨 Customization

### Fonts
The app is configured to use your custom "Sensa Wild Fill" font. Place the font files in `public/fonts/` and they will automatically load. If the custom fonts aren't available, the app falls back to:
- Righteous (Google Fonts)
- Fredoka One (Google Fonts)
- Inter (Google Fonts)

### Colors
The app uses a teal/emerald color scheme matching the Team Welly brand:
- Primary: `#0F766E` (teal-600)
- Secondary: `#14B8A6` (teal-500)
- Accent: `#10B981` (emerald-500)

### Logo
The lotus flower logo is embedded as an SVG component and automatically scales with the design.

## 📋 User Flows

1. **Landing Page**: Choose login method (SSO, Email, Corporate)
2. **Individual Signup**: Personal wellness account creation
3. **Corporate Access**: Employer/Employee portal selection
4. **Sign In**: Returning user authentication

## 🚀 Deployment Options

### GitHub Pages (Recommended)
1. Push your code to GitHub
2. Run `npm run deploy`
3. Enable GitHub Pages in repository settings

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Vercel
1. Import your GitHub repository
2. Vercel will auto-detect React settings
3. Deploy with one click

## 🔗 Links

- **Repository**: [https://github.com/faraon87/Team-Wellness-Web-Prototype](https://github.com/faraon87/Team-Wellness-Web-Prototype)
- **Live Demo**: [https://faraon87.github.io/Team-Wellness-Web-Prototype](https://faraon87.github.io/Team-Wellness-Web-Prototype)
- **Team Welly Website**: [https://teamwellnesscompany.com](https://teamwellnesscompany.com)

## 📞 Contact

- **Email**: Drchriszeiter@gmail.com
- **Social**: @teamwellnesscompany

---

Built with ❤️ for Team Welly by the wellness platform team.