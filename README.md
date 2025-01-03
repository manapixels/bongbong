<h1 align="center">Adaptive Math Trainer</h1>

<p align="center">
  An intelligent mathematics learning platform built with Next.js that adapts to each student's learning style and progress.
</p>

## Features

### Core Learning Features
- **Adaptive Learning**
  - Automatically adjusts difficulty based on student performance
  - Identifies and focuses on weak areas
  - Supports multiple learning styles (visual, numeric, word problems)
  - Personalized problem generation

- **Progress Tracking**
  - Detailed analytics and performance metrics
  - Category-specific progress tracking
  - Visual progress indicators
  - Streak tracking system

- **Gamification**
  - XP and level system
  - Virtual currency (coins)
  - Achievement system with unlockable badges
  - Streak rewards and bonuses

- **Interactive Features**
  - Visual aids for problem-solving
  - Sound effects and animations
  - Instant feedback
  - Practice and test modes

### Technical Features
- Built with [Next.js 14](https://nextjs.org) and App Router
- Real-time performance analytics with [Recharts](https://recharts.org)
- Data persistence with [Vercel Postgres](https://vercel.com/storage/postgres)
- Styled with [Tailwind CSS](https://tailwindcss.com) and [shadcn/ui](https://ui.shadcn.com)
- Authentication with [NextAuth.js](https://next-auth.js.org)

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or pnpm

### Environment Variables
Create a `.env` file with the following:
```env
DATABASE_URL=your_postgres_connection_string
AUTH_SECRET=your_auth_secret
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/math-trainer.git
cd math-trainer
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up the database:
```bash
pnpm db:push
```

4. Run the development server:
```bash
pnpm dev
```

Your app should now be running on [http://localhost:3000](http://localhost:3000).

## Deployment

### Deploy on Vercel

The easiest way to deploy your Math Trainer app is to use the [Vercel Platform](https://vercel.com).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fmath-trainer)

1. Push your code to a GitHub repository
2. Import your repository on Vercel
3. Add your environment variables
4. Deploy!

### Database Setup

1. Create a new Postgres database on [Vercel Storage](https://vercel.com/storage/postgres)
2. Add the database connection string to your environment variables
3. Run the database migrations:
```bash
pnpm db:push
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
