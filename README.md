# BongBong Math Trainer

A Next.js application for interactive math practice, built with PostgreSQL and Docker.

## Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/get-npm) (v8 or higher)
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
npm install
```

3. Set up environment variables:
```bash
# Copy the example env file and modify if needed
cp .env.example .env.local
```

4. Start the PostgreSQL database:
```bash
npm docker:up
```

5. Set up the database schema:
```bash
# Generate migrations
npm db:generate

# Push schema changes to database
npm db:push

# Run migrations
npm db:migrate
```

6. Start the development server:
```bash
npm dev
```

The application should now be running at [http://localhost:3000](http://localhost:3000)

## Available Scripts

### Database Commands
- `npm docker:up` - Start the PostgreSQL container
- `npm docker:down` - Stop the PostgreSQL container
- `npm docker:reset` - Reset the database (removes all data)
- `npm db:generate` - Generate new migrations
- `npm db:push` - Push schema changes to database
- `npm db:pull` - Pull database schema
- `npm db:check` - Check for schema changes
- `npm db:studio` - Open Drizzle Studio to view/edit data
- `npm db:migrate` - Run database migrations

### Development Commands
- `npm dev` - Start the development server
- `npm build` - Build the application
- `npm start` - Start the production server
- `npm lint` - Run linting

## Database Structure

The application uses PostgreSQL with the following main tables:
- `students` - Stores student profiles and preferences
- `math_problems` - Stores math problems and their solutions
- `student_progress` - Tracks student attempts and progress

## Troubleshooting

1. If the database connection fails:
   - Check if Docker is running
   - Ensure port 5432 is not in use
   - Try resetting the database: `npm docker:reset`

2. If migrations fail:
   - Remove the migrations folder: `rm -rf src/lib/db/migrations`
   - Regenerate migrations: `npm db:generate`
   - Push changes: `npm db:push`

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

[MIT](LICENSE)
