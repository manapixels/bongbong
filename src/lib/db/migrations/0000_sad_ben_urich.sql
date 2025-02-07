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
	"template_id" uuid,
	"type" text NOT NULL,
	"question" text NOT NULL,
	"variables" json NOT NULL,
	"answer" integer NOT NULL,
	"strand" text NOT NULL,
	"sub_strand" text NOT NULL,
	"difficulty" integer NOT NULL,
	"context" json,
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
CREATE TABLE "problem_templates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" text NOT NULL,
	"structure" text NOT NULL,
	"variables" json NOT NULL,
	"answer_formula" text NOT NULL,
	"context" json,
	"difficulty" integer NOT NULL,
	"strand" text NOT NULL,
	"sub_strand" text NOT NULL,
	"skills" json NOT NULL,
	"common_misconceptions" json NOT NULL,
	"explanation_template" json NOT NULL,
	"validation_rules" json,
	"created_at" timestamp DEFAULT now()
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
CREATE TABLE "student_achievements" (
	"user_id" uuid NOT NULL,
	"achievement_id" text NOT NULL,
	"unlocked_at" timestamp NOT NULL,
	CONSTRAINT "student_achievements_user_id_achievement_id_pk" PRIMARY KEY("user_id","achievement_id")
);
--> statement-breakpoint
CREATE TABLE "student_problem_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"template_id" uuid,
	"attempts" integer DEFAULT 0 NOT NULL,
	"correct_attempts" integer DEFAULT 0 NOT NULL,
	"last_attempted" timestamp NOT NULL,
	"average_response_time" integer DEFAULT 0 NOT NULL,
	"common_mistakes" json DEFAULT '[]'::json NOT NULL,
	"variations_used" json DEFAULT '[]'::json NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "student_progress" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"problem_id" uuid,
	"is_correct" boolean NOT NULL,
	"time_spent" integer,
	"created_at" timestamp DEFAULT now(),
	"sub_strand_progress" json
);
--> statement-breakpoint
CREATE TABLE "student_skill_progress" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"skill_id" text NOT NULL,
	"proficiency" integer NOT NULL,
	"last_practiced" timestamp NOT NULL,
	"total_attempts" integer DEFAULT 0 NOT NULL,
	"success_rate" integer DEFAULT 0 NOT NULL,
	"needs_review" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
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
ALTER TABLE "math_problems" ADD CONSTRAINT "math_problems_template_id_problem_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."problem_templates"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practice_sessions" ADD CONSTRAINT "practice_sessions_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_achievements" ADD CONSTRAINT "student_achievements_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_achievements" ADD CONSTRAINT "student_achievements_achievement_id_achievements_id_fk" FOREIGN KEY ("achievement_id") REFERENCES "public"."achievements"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_problem_history" ADD CONSTRAINT "student_problem_history_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_problem_history" ADD CONSTRAINT "student_problem_history_template_id_problem_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."problem_templates"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_progress" ADD CONSTRAINT "student_progress_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_progress" ADD CONSTRAINT "student_progress_problem_id_math_problems_id_fk" FOREIGN KEY ("problem_id") REFERENCES "public"."math_problems"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_skill_progress" ADD CONSTRAINT "student_skill_progress_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;