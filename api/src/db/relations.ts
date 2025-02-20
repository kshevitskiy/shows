import { relations } from "drizzle-orm/relations";
import { shows, ratings, images, showGenres, genres } from "./schema";

export const ratingsRelations = relations(ratings, ({one}) => ({
	show: one(shows, {
		fields: [ratings.showId],
		references: [shows.id]
	}),
}));

export const showsRelations = relations(shows, ({many}) => ({
	ratings: many(ratings),
	images: many(images),
	showGenres: many(showGenres),
}));

export const imagesRelations = relations(images, ({one}) => ({
	show: one(shows, {
		fields: [images.showId],
		references: [shows.id]
	}),
}));

export const showGenresRelations = relations(showGenres, ({one}) => ({
	show: one(shows, {
		fields: [showGenres.showId],
		references: [shows.id]
	}),
	genre: one(genres, {
		fields: [showGenres.genreId],
		references: [genres.id]
	}),
}));

export const genresRelations = relations(genres, ({many}) => ({
	showGenres: many(showGenres),
}));