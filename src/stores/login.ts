import { writable } from "svelte/store";

export const loggedIn = writable(false);
export const vtCode = writable("");
export const groupCode = writable("");
export const inputCode = writable("");
