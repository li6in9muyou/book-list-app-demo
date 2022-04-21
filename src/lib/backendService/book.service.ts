import { map } from "lodash";
import { fileNameWithoutExtension, takeExtension } from "../utility";

export class Book {
  id: number;
  path: string;
  constructor({ id, path }: { id: number; path: string }) {
    this.id = id;
    this.path = path;
  }
  get title() {
    return fileNameWithoutExtension(this.path);
  }
  get format() {
    return takeExtension(this.path);
  }
}

export async function fetchAllBooks(): Promise<Book[]> {
  const url = import.meta.env.VITE_DEV_DB_URL + `/api/books`;
  return map(await (await fetch(url)).json(), (book) => new Book(book));
}

export async function fetchBooksById(bookIds: number[]): Promise<Book[]> {
  let ans = [];
  for (const bookId of bookIds) {
    const url = import.meta.env.VITE_DEV_DB_URL + `/api/books/${bookId}`;
    const r = await fetch(url);
    if (r.ok) {
      ans.push(new Book(await r.json()));
    }
  }
  return ans;
}
