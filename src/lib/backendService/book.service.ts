export class Book {
  id: number;
  path: string;
  constructor({ id, path }: { id: number; path: string }) {}
}

export async function fetchAllBooks(): Promise<Book[]> {
  const url = import.meta.env.VITE_DEV_DB_URL + `/api/books`;
  return (await (await fetch(url)).json()).forEach((book) => new Book(book));
}
