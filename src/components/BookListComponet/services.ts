import { map } from "lodash";

export async function fetchBookListsByUserId(
  userId: number
): Promise<BookList[]> {
  console.log(2);
  const endpoint = `/book-lists/users/${userId}`;
  const q = await fetch(import.meta.env.VITE_DEV_DB_URL + endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const obj = await q.json();
  console.log("book-lists of user: ", userId, obj);
  if (q.ok) {
    return map(
      obj,
      (list) => new BookList(list.user, list.id, list.title, list.books)
    );
  } else {
    throw { ...obj, message: obj.detail };
  }
}

export class BookList {
  userId: number;
  id: number;
  title: string;
  books: number[];

  constructor(userId: number, id: number, title: string, books: number[] = []) {
    this.userId = userId;
    this.id = id;
    this.title = title;
    this.books = books;
  }
}

export async function updateBookList(
  userId: number,
  bookListId: number,
  books: number[],
  shouldInList: boolean
) {
  console.log(bookListId, shouldInList, books);
}

export async function removeManyBooks(
  userId: number,
  bookListId: number,
  books: number[]
) {
  return await updateBookList(userId, bookListId, books, false);
}

export async function addManyBooks(
  userId: number,
  bookListId: number,
  books: number[]
) {
  return await updateBookList(userId, bookListId, books, true);
}
