import type { InferSelectModel } from 'drizzle-orm';
import { progress } from '@/lib/db/schema';

// Types from schema
export type Progress = InferSelectModel<typeof progress>;
