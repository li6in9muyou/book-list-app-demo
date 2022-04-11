import { map } from "lodash";

export class Book {
  id: number;
  path: string;
  constructor({ id, path }: { id: number; path: string }) {
    this.id = id;
    this.path = path;
  }
}

export async function fetchAllBooks(): Promise<Book[]> {
  const url = import.meta.env.VITE_DEV_DB_URL + `/api/books`;
  return map(await (await fetch(url)).json(), (book) => new Book(book));
}
