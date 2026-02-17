/* Modal / overlay stores */
import { writable } from 'svelte/store';

export const searchOpen = writable(false);
export const chatOpen = writable(false);
export const paymentOpen = writable(false);
export const paymentContext = writable('auto');
export const transferOpen = writable(false);
export const quoteOpen = writable(false);
export const idCardOpen = writable(false);
