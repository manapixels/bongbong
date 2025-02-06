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
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question" text NOT NULL,
	"answer" integer NOT NULL,
	"category" text NOT NULL,
	"difficulty" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "practice_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
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
	"user_id" uuid NOT NULL,
	"achievement_id" text NOT NULL,
	"unlocked_at" timestamp NOT NULL,
	CONSTRAINT "student_achievements_user_id_achievement_id_pk" PRIMARY KEY("user_id","achievement_id")
);
--> statement-breakpoint
CREATE TABLE "student_progress" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"problem_id" uuid,
	"is_correct" boolean NOT NULL,
	"time_spent" integer,
	"created_at" timestamp DEFAULT now(),
	"topic_progress" json
);
--> statement-breakpoint
CREATE TABLE "topics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"level" integer NOT NULL,
	"strand" text NOT NULL,
	"sub_strand" text NOT NULL,
	"description" text,
	"sub_topics" json NOT NULL
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(64) NOT NULL,
	"password" varchar(64),
	"is_student" boolean DEFAULT false NOT NULL,
	"xp_points" integer DEFAULT 0 NOT NULL,
	"coins" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "practice_sessions" ADD CONSTRAINT "practice_sessions_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_achievements" ADD CONSTRAINT "student_achievements_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_achievements" ADD CONSTRAINT "student_achievements_achievement_id_achievements_id_fk" FOREIGN KEY ("achievement_id") REFERENCES "public"."achievements"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_progress" ADD CONSTRAINT "student_progress_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_progress" ADD CONSTRAINT "student_progress_problem_id_math_problems_id_fk" FOREIGN KEY ("problem_id") REFERENCES "public"."math_problems"("id") ON DELETE no action ON UPDATE no action;