import type { InferSelectModel } from 'drizzle-orm';
import { user } from '@/lib/db/schema';

// Base types from schema
export type User = InferSelectModel<typeof user>;

export interface AuthUser {
  id: string;
  email: string;
}
