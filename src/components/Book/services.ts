import { sleep } from "../../lib/utility";
import { map } from "lodash";

export { fetchBooksById, fetchAllBooks, Book };

async function fetchBooksById(books: number[]) {
  return Promise.all(
    books.map(async (b) => {
      await sleep(500);
      return new Book(b, "书本名字示例.pdf");
    })
  );
}

class Book {
  id: number;
  path: string;

  constructor(id: number, path: string) {
    this.id = id;
    this.path = path;
  }
}

async function fetchAllBooks(): Promise<Book[]> {
  const url = import.meta.env.VITE_DEV_DB_URL + `/api/books`;
  return map(
    await (await fetch(url)).json(),
    (book) => new Book(book.id, book.path)
  );
}
