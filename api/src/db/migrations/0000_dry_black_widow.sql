CREATE TABLE "genres" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	CONSTRAINT "genres_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "images" (
	"id" serial PRIMARY KEY NOT NULL,
	"show_id" integer,
	"medium" text,
	"original" text,
	CONSTRAINT "images_show_id_unique" UNIQUE("show_id")
);
--> statement-breakpoint
CREATE TABLE "ratings" (
	"id" serial PRIMARY KEY NOT NULL,
	"show_id" integer,
	"average" numeric(3, 1) DEFAULT '0' NOT NULL,
	CONSTRAINT "ratings_show_id_unique" UNIQUE("show_id")
);
--> statement-breakpoint
CREATE TABLE "show_genres" (
	"show_id" integer NOT NULL,
	"genre_id" integer NOT NULL,
	CONSTRAINT "show_genres_show_id_genre_id_pk" PRIMARY KEY("show_id","genre_id")
);
--> statement-breakpoint
CREATE TABLE "shows" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"name" varchar(255) NOT NULL,
	"type" varchar(50) NOT NULL,
	"language" varchar(50),
	"status" varchar(50) NOT NULL,
	"runtime" integer,
	"average_runtime" integer,
	"premiered" date,
	"ended" date,
	"official_site" text,
	"weight" integer,
	"summary" text,
	"updated" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "images" ADD CONSTRAINT "images_show_id_shows_id_fk" FOREIGN KEY ("show_id") REFERENCES "public"."shows"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_show_id_shows_id_fk" FOREIGN KEY ("show_id") REFERENCES "public"."shows"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "show_genres" ADD CONSTRAINT "show_genres_show_id_shows_id_fk" FOREIGN KEY ("show_id") REFERENCES "public"."shows"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "show_genres" ADD CONSTRAINT "show_genres_genre_id_genres_id_fk" FOREIGN KEY ("genre_id") REFERENCES "public"."genres"("id") ON DELETE no action ON UPDATE no action;