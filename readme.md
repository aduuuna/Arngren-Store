# 🛒 Arngren Store Redesign - HCI Final Semester Project

A Next.js + TypeScript redesign of the famously chaotic Arngren.net website, transforming it into a clean, usable e-commerce experience. This project explores user interface design principles while implementing modern web technologies and browser storage patterns.

## 🎯 Project Background

Arngren.net is notorious for its scattered, overwhelming design that violates most UX principles. As my HCI final project, I chose to redesign this challenging website to demonstrate how proper information architecture and clean design can dramatically improve user experience.

Along the way, I also explored browser storage solutions to manage shopping cart data without requiring a backend database - learning valuable lessons about web development and user experience design.

## 🎨 Design Philosophy

- **From chaos to clarity:** Transformed Arngren's scattered layout into organized, scannable sections
- **User-centered navigation:** Implemented intuitive categorization and search functionality
- **Modern UX patterns:** Applied contemporary e-commerce design standards
- **Clean information architecture:** Organized products and content in logical, findable ways

## ✨ Features

- **Redesigned UI/UX:** Complete visual and structural overhaul of the original Arngren site
- **Smart cart management:** Per-visitor cart using `sessionStorage` (each tab = isolated session)
- **Persistent user sessions:** `visitor_id` system to identify users across page refreshes
- **Flexible storage:** Cart survives page refreshes; clears after order confirmation
- **Experimental persistence:** Optional `localStorage` fallback to persist cart across browser restarts
- **Streamlined checkout:** Simple, intuitive checkout flow with form validation
- **No backend required:** Fully client-side prototype perfect for learning and demonstration

## 🧰 Tech Stack

- **Frontend:** Next.js (React) + TypeScript
- **Styling:** Tailwind CSS
- **Storage:** Browser APIs (`sessionStorage`, `localStorage`)
- **Deployment:** Vercel-ready (or any Node-compatible host)

## 📚 Key Learnings

Through this project, I gained valuable insights into:

- How browser storage patterns affect user experience and data persistence
- The critical importance of information architecture in e-commerce design
- Balancing modern design trends with core usability principles
- Transforming unusable interfaces into intuitive user experiences
- Client-side state management without backend dependencies

## 🧭 Getting Started

### Prerequisites

- Node.js >= 18 (recommended)
- npm, yarn, or pnpm

### Installation & Local Development

```bash
# Clone the repository
git clone https://github.com/aduuuna/Arngren-Store
cd arngren-store

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your configuration values

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the redesigned Arngren store in your browser.

## 🔧 Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
# Add any other required environment variables
```

## 🚀 Deployment

This project is optimized for deployment on Vercel, but can be deployed on any platform that supports Next.js applications.

**Note:** This is a prototype/learning project created for educational purposes as part of an HCI course. It demonstrates UX design principles and modern web development techniques through the lens of redesigning one of the web's most notoriously difficult-to-use sites.
