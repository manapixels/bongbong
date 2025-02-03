CREATE TABLE "achievements" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"required_value" integer NOT NULL,
	"type" text NOT NULL,
	"reward_coins" integer NOT NULL,
	"reward_xp" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "math_problems" (
	"id" text PRIMARY KEY NOT NULL,
	"student_id" text NOT NULL,
	"question" text NOT NULL,
	"answer" integer NOT NULL,
	"category" text NOT NULL,
	"difficulty" integer NOT NULL,
	"attempted_at" timestamp DEFAULT now(),
	"is_correct" boolean NOT NULL,
	"time_spent" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "practice_sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"student_id" text NOT NULL,
	"mode" text NOT NULL,
	"started_at" timestamp NOT NULL,
	"ended_at" timestamp,
	"total_questions" integer NOT NULL,
	"correct_answers" integer DEFAULT 0 NOT NULL,
	"average_response_time" integer,
	"xp_earned" integer,
	"coins_earned" integer
);
--> statement-breakpoint
CREATE TABLE "student_achievements" (
	"student_id" text NOT NULL,
	"achievement_id" text NOT NULL,
	"unlocked_at" timestamp NOT NULL,
	CONSTRAINT "student_achievements_student_id_achievement_id_pk" PRIMARY KEY("student_id","achievement_id")
);
--> statement-breakpoint
CREATE TABLE "student_progress" (
	"id" text PRIMARY KEY NOT NULL,
	"student_id" text NOT NULL,
	"total_problems" integer DEFAULT 0 NOT NULL,
	"correct_answers" integer DEFAULT 0 NOT NULL,
	"streaks" integer DEFAULT 0 NOT NULL,
	"category_progress" json DEFAULT '{}'::json,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "students" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"level" integer DEFAULT 1 NOT NULL,
	"weak_areas" json DEFAULT '[]'::json,
	"strengths" json DEFAULT '[]'::json,
	"preferred_learning_style" text DEFAULT 'numeric',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"xp" integer DEFAULT 0 NOT NULL,
	"coins" integer DEFAULT 0 NOT NULL,
	"achievements" json DEFAULT '[]'::json,
	"last_login_streak" integer DEFAULT 0 NOT NULL,
	"last_login_date" timestamp,
	"visual_aids_enabled" boolean DEFAULT true NOT NULL,
	"sound_effects_enabled" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Document" DROP CONSTRAINT "Document_id_createdAt_pk";--> statement-breakpoint
ALTER TABLE "Suggestion" DROP CONSTRAINT "Suggestion_id_pk";--> statement-breakpoint
ALTER TABLE "Document" ADD CONSTRAINT "Document__pk" PRIMARY KEY("");--> statement-breakpoint
ALTER TABLE "Suggestion" ADD CONSTRAINT "Suggestion__pk" PRIMARY KEY("");--> statement-breakpoint
ALTER TABLE "Document" ADD COLUMN "kind" varchar DEFAULT 'text' NOT NULL;--> statement-breakpoint
ALTER TABLE "math_problems" ADD CONSTRAINT "math_problems_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practice_sessions" ADD CONSTRAINT "practice_sessions_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_achievements" ADD CONSTRAINT "student_achievements_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_achievements" ADD CONSTRAINT "student_achievements_achievement_id_achievements_id_fk" FOREIGN KEY ("achievement_id") REFERENCES "public"."achievements"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_progress" ADD CONSTRAINT "student_progress_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Document" DROP COLUMN "text";