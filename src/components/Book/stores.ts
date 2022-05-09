import { readable, writable } from "svelte/store";
import { type Book, fetchAllBooks } from "./services";
import { isEmpty } from "lodash";

let __all_books = [];

export const AllBooks = readable<Promise<Book[]>>(null, (set) => {
  set(Promise.resolve(isEmpty(__all_books) ? fetchAllBooks() : __all_books));
});

export const BookCatalog = writable([]);
