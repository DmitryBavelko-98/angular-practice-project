import { FavoriteTypes } from "./favorite-types";

export type FavoriteStore = {[key in FavoriteTypes]: string[]};
