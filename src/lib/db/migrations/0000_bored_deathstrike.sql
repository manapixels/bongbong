CREATE TYPE "public"."subject" AS ENUM('english', 'chinese', 'science', 'mathematics');--> statement-breakpoint
CREATE TABLE "achievements" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"required_value" integer NOT NULL,
	"type" text NOT NULL,
	"reward_coins" integer NOT NULL,
	"reward_xp" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "math_questions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"subject" "subject" DEFAULT 'mathematics' NOT NULL,
	"type" text,
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"explanation" json NOT NULL,
	"difficulty" integer NOT NULL,
	"strand" text NOT NULL,
	"sub_strand" text NOT NULL,
	"answer_formula" text NOT NULL,
	"variables" json NOT NULL,
	"created_at" timestamp DEFAULT now()
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
CREATE TABLE "progress" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"question_id" uuid,
	"is_correct" boolean NOT NULL,
	"time_spent" integer,
	"created_at" timestamp DEFAULT now(),
	"sub_strand_progress" json
);
--> statement-breakpoint
CREATE TABLE "strands" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"level" integer NOT NULL,
	"description" text,
	"strand" text NOT NULL,
	"sub_strand" text NOT NULL,
	"sub_strand_topics" json NOT NULL
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(64) NOT NULL,
	"password" varchar(64),
	"is_student" boolean DEFAULT false NOT NULL,
	"xp_points" integer DEFAULT 0 NOT NULL,
	"coins" integer DEFAULT 0 NOT NULL,
	"preferences" json DEFAULT '{"difficulty":"medium","topicsEnabled":["addition","subtraction","multiplication","division"]}'::json
);
--> statement-breakpoint
ALTER TABLE "achievements" ADD CONSTRAINT "achievements_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practice_sessions" ADD CONSTRAINT "practice_sessions_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "progress" ADD CONSTRAINT "progress_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "progress" ADD CONSTRAINT "progress_question_id_math_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."math_questions"("id") ON DELETE no action ON UPDATE no action;