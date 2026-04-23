<div align="center">

# 🎓 OptiStep Academy

### Professional Optician Training & Certification Platform

*A comprehensive, interactive learning platform for opticians to master clinical skills, lens designs, and patient care*

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.14-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-12.12.1-DD2C00?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [📚 Learning Modules](#-learning-modules)
- [🚀 Getting Started](#-getting-started)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🔧 Configuration](#-configuration)
- [📱 Features Overview](#-features-overview)
- [🎨 Design Philosophy](#-design-philosophy)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

- **🎯 Interactive Learning**: Engaging slide-based lessons with rich media content
- **🎥 Video Integration**: HD video tutorials for each module
- **✅ Certification Quizzes**: 80% passing grade required for module completion
- **🔐 User Authentication**: Secure Firebase authentication system
- **📊 Progress Tracking**: Real-time tracking of completed modules
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **⚡ Hot Module Replacement**: Instant updates during development
- **🎨 Modern UI**: Sleek, professional interface built with Tailwind CSS
- **🔄 Smart Caching**: Automatic cache-busting for seamless updates

---

## 📚 Learning Modules

OptiStep Academy offers comprehensive training across multiple domains:

| # | Module | Category | Description |
|---|--------|----------|-------------|
| 1 | **Troubleshooting & Remakes** | Clinical | Diagnose patient vision complaints and manage lens remakes |
| 2 | **Lens Designs & Categories** | Optical | From Single Vision to Advanced Digital Progressives |
| 3 | **Lifestyle Consultation** | Sales | Asking the right questions to find the best lens options |
| 4 | **Customer Service** | Service | Creating positive patient experiences |
| 5 | **Frame Fitting Guide** | Fitting | Master frame selection and fitting techniques |
| 6 | **Prism & Prentice Rule** | Calculations | Learn prism calculations and centration |
| 7 | **Transitions Gen S** | Lenses | Latest photochromic lens technology |
| 8 | **Lens Materials** | Lenses | CR-39, Poly, Trivex, and High Index materials |
| 9 | **HIPAA Compliance** | Legal | Patient privacy and data protection |
| 10 | **Eye Anatomy** | Anatomy | Understanding eye structures and functions |

Each module includes:
- 📸 Detailed instructional slides with images and videos
- 🎬 Comprehensive video tutorial
- 📝 Qualifying exam (80% pass mark required)
- ✅ Certificate of completion upon passing

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** package manager
- **Firebase account** (for authentication and database features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/optistep-academy.git
   cd optistep-academy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   
   Update `src/lib/firebase.ts` with your Firebase project credentials:
   ```typescript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-auth-domain",
     projectId: "your-project-id",
     storageBucket: "your-storage-bucket",
     messagingSenderId: "your-sender-id",
     appId: "your-app-id"
   };
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

The production-ready files will be generated in the `dist/` directory.

### Deploy to Vercel

```bash
npx vercel --prod
```

The project includes optimized caching configuration for Vercel deployments.

---

## 🛠️ Tech Stack

### Frontend
- **[React 19](https://react.dev/)** - Modern UI library with latest features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite](https://vitejs.dev/)** - Lightning-fast build tool and dev server
- **[React Router DOM](https://reactrouter.com/)** - Declarative routing
- **[Motion](https://motion.dev/)** - Smooth animations and transitions

### Styling
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Beautiful, consistent icons
- **[clsx](https://github.com/lukeed/clsx)** + **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Smart class name merging

### Backend & Services
- **[Firebase](https://firebase.google.com/)** - Authentication and Firestore database

### Development Tools
- **[tsx](https://github.com/esbuild-kit/tsx)** - TypeScript execution
- **[dotenv](https://github.com/motdotla/dotenv)** - Environment variable management

---

## 📁 Project Structure

```
optistep-academy/
├── public/                      # Static assets
│   ├── slideimages/            # Module slide images
│   │   ├── troubleshooting/    # Module 1 images
│   │   ├── lens design/        # Module 2 images
│   │   ├── medicaid/           # Kentucky Medicaid images
│   │   └── framefit/           # Frame fitting images
│   ├── slidevideos/            # Module videos
│   │   ├── trouble.mp4
│   │   ├── lensdesign.mp4
│   │   └── kentucky.gif
│   ├── sw.js                   # Service Worker (PWA)
│   └── site.webmanifest        # PWA manifest
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── Auth.tsx           # Authentication component
│   │   └── Layout.tsx         # Main layout wrapper
│   ├── constants/              # Application constants
│   │   └── modules.ts         # Module definitions
│   ├── contexts/               # React Context providers
│   │   └── AuthContext.tsx    # Authentication context
│   ├── lib/                    # Utility libraries
│   │   ├── firebase.ts        # Firebase configuration
│   │   └── utils.ts           # Helper functions
│   ├── pages/                  # Page components
│   │   ├── Dashboard.tsx      # Main dashboard
│   │   └── ModulePage.tsx     # Module detail page
│   ├── App.tsx                # Root application component
│   ├── main.tsx               # Application entry point
│   ├── index.css              # Global styles
│   └── types.ts               # TypeScript type definitions
├── vercel.json                 # Vercel deployment configuration
├── firebase-blueprint.json    # Firebase configuration template
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite build configuration
└── README.md                  # This file
```

---

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication (Email/Password)
3. Create a Firestore database
4. Update `src/lib/firebase.ts` with your Firebase config
5. Deploy security rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

### Adding New Modules

To add a new learning module, edit `src/constants/modules.ts`:

```typescript
{
  id: 'module-id',
  title: 'Module Title',
  description: 'Brief description',
  content: 'Detailed content',
  videoUrl: '/slidevideos/your-video.mp4',
  order: 11,
  category: 'Category',
  slides: [
    {
      id: 'slide1',
      title: 'Slide Title',
      content: 'Slide content...',
      imageUrl: '/slideimages/module/slide1.jpg'
      // OR for GIF/video slides:
      // videoUrl: '/slidevideos/animation.gif'
    },
    // ... more slides
  ],
  quiz: {
    questions: [
      {
        id: 'q1',
        text: 'Question text?',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswerIndex: 0
      },
      // ... more questions
    ]
  }
}
```

### Media Assets

**Images:** Place in `public/slideimages/[module-name]/`
- Supported formats: JPG, PNG, WebP
- Recommended size: 1200x800px
- Images display with `object-contain` to show full content

**Videos & GIFs:** Place in `public/slidevideos/`
- Supported formats: MP4 (H.264 codec), GIF
- Videos support autoplay and loop functionality
- GIFs are automatically detected and displayed as animated images

### Cache Management

The application implements multi-layer cache busting:
- Content hashing for all build assets
- HTML cache prevention meta tags
- Vercel cache headers configured in `vercel.json`
- Users automatically receive updates without manual refresh

---

## 📱 Features Overview

### Dashboard
- Clean, card-based module overview
- Visual progress indicators
- Quick access to incomplete modules
- Category-based organization

### Module Learning Flow
1. **📸 Slide Presentation** - Interactive slides with images, videos, and GIFs
2. **🎥 Video Tutorial** - Embedded HD video player
3. **📝 Qualifying Exam** - Multiple-choice assessment
4. **✅ Certification** - Instant feedback and completion tracking

### User Experience
- **Smooth Animations** - Powered by Motion library
- **Responsive Layout** - Mobile-first design approach
- **Accessibility** - Semantic HTML and keyboard navigation
- **Performance** - Code splitting and lazy loading
- **Full Image Display** - All images use `object-contain` for complete visibility

---

## 🎨 Design Philosophy

OptiStep Academy follows modern design principles:

- **Minimalist Interface** - Clean, distraction-free learning environment
- **Professional Aesthetic** - Corporate color palette with brand consistency
- **Intuitive Navigation** - Clear visual hierarchy and user flows
- **Micro-interactions** - Subtle animations for enhanced engagement
- **Dark Mode Ready** - Optimized color scheme for reduced eye strain

### Color Palette
- **Primary Brand**: Custom brand color
- **Surface Colors**: Layered panel system
- **Text Hierarchy**: Primary, secondary, and muted text levels
- **Status Colors**: Success (emerald), warning, and error states

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. Create a **feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. Open a **Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent code formatting
- Write meaningful commit messages
- Test on multiple screen sizes
- Ensure all images display completely (use object-contain)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Support

For support, questions, or feature requests:
- 📧 Email: support@optistep.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/optistep-academy/issues)
- 📖 Documentation: [Wiki](https://github.com/yourusername/optistep-academy/wiki)

---

<div align="center">

**Made with ❤️ for opticians worldwide**

[⭐ Star this repo](https://github.com/yourusername/optistep-academy) • [🐛 Report Bug](https://github.com/yourusername/optistep-academy/issues) • [💡 Request Feature](https://github.com/yourusername/optistep-academy/issues)

</div>