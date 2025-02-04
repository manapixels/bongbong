ALTER TABLE "Chat" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "Document" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "Message" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "Suggestion" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "Vote" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "Chat" CASCADE;--> statement-breakpoint
DROP TABLE "Document" CASCADE;--> statement-breakpoint
DROP TABLE "Message" CASCADE;--> statement-breakpoint
DROP TABLE "Suggestion" CASCADE;--> statement-breakpoint
DROP TABLE "Vote" CASCADE;--> statement-breakpoint
ALTER TABLE "math_problems" DROP CONSTRAINT "math_problems_student_id_students_id_fk";
--> statement-breakpoint
ALTER TABLE "math_problems" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "math_problems" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "math_problems" ALTER COLUMN "difficulty" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "student_progress" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "student_progress" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "student_progress" ALTER COLUMN "student_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "student_progress" ALTER COLUMN "student_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "students" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "students" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "students" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "student_progress" ADD COLUMN "problem_id" uuid;--> statement-breakpoint
ALTER TABLE "student_progress" ADD COLUMN "is_correct" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "student_progress" ADD COLUMN "time_spent" integer;--> statement-breakpoint
ALTER TABLE "student_progress" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "student_progress" ADD COLUMN "topic_progress" json;--> statement-breakpoint
ALTER TABLE "student_progress" ADD CONSTRAINT "student_progress_problem_id_math_problems_id_fk" FOREIGN KEY ("problem_id") REFERENCES "public"."math_problems"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "math_problems" DROP COLUMN "student_id";--> statement-breakpoint
ALTER TABLE "math_problems" DROP COLUMN "attempted_at";--> statement-breakpoint
ALTER TABLE "math_problems" DROP COLUMN "is_correct";--> statement-breakpoint
ALTER TABLE "math_problems" DROP COLUMN "time_spent";--> statement-breakpoint
ALTER TABLE "student_progress" DROP COLUMN "total_problems";--> statement-breakpoint
ALTER TABLE "student_progress" DROP COLUMN "correct_answers";--> statement-breakpoint
ALTER TABLE "student_progress" DROP COLUMN "streaks";--> statement-breakpoint
ALTER TABLE "student_progress" DROP COLUMN "category_progress";--> statement-breakpoint
ALTER TABLE "student_progress" DROP COLUMN "updated_at";--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN "level";--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN "weak_areas";--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN "strengths";--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN "preferred_learning_style";--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN "updated_at";--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN "xp";--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN "coins";--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN "achievements";--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN "last_login_streak";--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN "last_login_date";--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN "visual_aids_enabled";--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN "sound_effects_enabled";