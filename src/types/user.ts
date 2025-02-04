import type { InferSelectModel } from 'drizzle-orm';
import { user, students } from '@/lib/db/schema';

// Base types from schema
export type User = InferSelectModel<typeof user>;
export type Student = InferSelectModel<typeof students>;

// Extended types
export interface UserProfile extends User {
  student?: Student;
}

export interface AuthUser {
  id: string;
  email: string;
} 