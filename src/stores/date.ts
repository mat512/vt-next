import { writable } from "svelte/store";
import { getWeek, getYear } from "../lib/date";

const currentWeek = getWeek(new Date());

export const week = writable(currentWeek);
export const year = writable(getYear(currentWeek));
export const date = writable(new Date().toISOString().slice(0, 10));
