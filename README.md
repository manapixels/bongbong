# BongBong Math Trainer

A Next.js application for interactive math practice, built with PostgreSQL and Docker.

## Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/installation) (v8 or higher)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/) (usually comes with Docker Desktop)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd bongbong
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
# Copy the example env file and modify if needed
cp .env.example .env.local
```

4. Start the PostgreSQL database:
```bash
pnpm docker:up
```

5. Set up the database schema:
```bash
# Generate migrations
pnpm db:generate

# Push schema changes to database
pnpm db:push

# Run migrations
pnpm db:migrate
```

6. Start the development server:
```bash
pnpm dev
```

The application should now be running at [http://localhost:3000](http://localhost:3000)

## Available Scripts

### Database Commands
- `pnpm docker:up` - Start the PostgreSQL container
- `pnpm docker:down` - Stop the PostgreSQL container
- `pnpm docker:reset` - Reset the database (removes all data)
- `pnpm db:generate` - Generate new migrations
- `pnpm db:push` - Push schema changes to database
- `pnpm db:pull` - Pull database schema
- `pnpm db:check` - Check for schema changes
- `pnpm db:studio` - Open Drizzle Studio to view/edit data
- `pnpm db:migrate` - Run database migrations

### Development Commands
- `pnpm dev` - Start the development server
- `pnpm build` - Build the application
- `pnpm start` - Start the production server
- `pnpm lint` - Run linting

## Database Structure

The application uses PostgreSQL with the following main tables:
- `students` - Stores student profiles and preferences
- `math_problems` - Stores math problems and their solutions
- `student_progress` - Tracks student attempts and progress

## Troubleshooting

1. If the database connection fails:
   - Check if Docker is running
   - Ensure port 5432 is not in use
   - Try resetting the database: `pnpm docker:reset`

2. If migrations fail:
   - Remove the migrations folder: `rm -rf src/lib/db/migrations`
   - Regenerate migrations: `pnpm db:generate`
   - Push changes: `pnpm db:push`

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

[MIT](LICENSE)
