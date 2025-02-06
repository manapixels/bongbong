import { Pool } from 'pg';
import { promises as fs } from 'fs';
import path from 'path';

const pool = new Pool({
  // These values should match your docker-compose.yml or environment variables
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'postgres',
});

async function resetDatabase() {
  try {
    // Drop all existing tables
    await pool.query(`
      DROP TABLE IF EXISTS 
        student_progress,
        student_achievements,
        practice_sessions,
        math_problems,
        achievements,
        topics,
        "User"
      CASCADE;
    `);

    console.log('✓ Dropped all tables');

    // Read and execute the migration file
    const migrationPath = path.join(
      process.cwd(),
      'src',
      'lib',
      'db',
      'migrations',
      '0000_closed_cannonball.sql'
    );
    const migrationSQL = await fs.readFile(migrationPath, 'utf8');

    // Split and execute each statement separately
    const statements = migrationSQL
      .split('-->')
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt && !stmt.startsWith('statement-breakpoint'));

    for (const statement of statements) {
      if (statement) {
        await pool.query(statement);
      }
    }

    console.log('✓ Applied migrations');
  } catch (error) {
    console.error('Error resetting database:', error);
    throw error;
  } finally {
    // Close the pool when done
    await pool.end();
  }
}

// Only run if this file is being executed directly
if (require.main === module) {
  resetDatabase()
    .then(() => {
      console.log('Database reset complete');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Failed to reset database:', error);
      process.exit(1);
    });
}

export default resetDatabase;
