# Ahmed Hamza Portfolio

A beautiful, modern portfolio website built with React, TypeScript, and Tailwind CSS. This portfolio features smooth animations, a custom cursor, and a full admin panel with Supabase integration.

**Built with love for someone special.** ❤️

## Features

- ✨ Stunning animated hero section with custom typography
- 🎨 Beautiful dark theme with smooth Framer Motion animations
- 📱 Fully responsive design
- 🔐 Admin panel with Supabase authentication
- 📝 Dynamic content management (Profile, Projects, Experience, Skills, Socials)
- 🖼️ Dynamic image support for About page and Projects

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **UI Components**: shadcn/ui (Radix UI)
- **Backend**: Supabase (Database & Auth)
- **Forms**: React Hook Form, Zod

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/captainaraf/ahmed-hamza-portfolio.git
cd ahmed-hamza-portfolio
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up the database:
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Run the contents of `supabase_schema.sql`
   - Then run `supabase_migration.sql` for any additional migrations

5. Create an admin user:
   - Go to Supabase Dashboard → Authentication → Users
   - Add a new user with email/password

6. Start the development server:
```bash
npm run dev
```

7. Open [http://localhost:8080](http://localhost:8080)

## Admin Panel

Access the admin panel at `/admin` to manage:
- Profile information
- Social links
- Projects
- Work experience
- Skills & Awards

## Project Structure

```
├── public/            # Static assets
│   └── svg/           # SVG icons and letters
├── src/
│   ├── components/    # React components
│   │   ├── admin/     # Admin panel components
│   │   └── ui/        # shadcn/ui components
│   ├── lib/           # Utilities and Supabase client
│   └── pages/         # Page components
├── supabase_schema.sql    # Database schema
└── supabase_migration.sql # Database migrations
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Netlify

1. Push to GitHub
2. Import project in Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variables
6. Deploy

## License

This project is open source and available under the [MIT License](LICENSE).

---
