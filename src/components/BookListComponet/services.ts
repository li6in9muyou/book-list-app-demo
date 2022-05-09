import { filter, map, pullAll, uniq } from "lodash";
import { AllBooks } from "../Book/stores";
import { get } from "svelte/store";
import { CurrentAccessToken } from "../userProfile/stores";

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
  async getBooksInfo() {
    return filter(await get(AllBooks), (b) => this.books.indexOf(b.id) !== -1);
  }
}

export async function updateBookList(
  userId: number,
  bookListId: number,
  books: number[],
  shouldInList: boolean
) {
  const query = import.meta.env.VITE_DEV_DB_URL + `/book-lists/${bookListId}`;
  const q = await fetch(query, { headers: { Accept: "application/json" } });
  console.log(q);
  if (!q.ok) {
    throw { ...q, message: JSON.stringify(q) };
  }
  const old_list: BookList = await q.json();
  let new_list: number[] = [];
  if (shouldInList) {
    new_list = uniq([...books, ...old_list.books]);
  } else {
    new_list = pullAll(old_list.books, books);
  }
  const q2 = await fetch(query, {
    method: "PUT",
    body: JSON.stringify({ ...old_list, books: new_list }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await CurrentAccessToken()}`,
    },
  });
  if (!q2.ok) {
    throw { ...q, message: JSON.stringify(q) };
  }
  console.log(bookListId, shouldInList, books);
}

export async function createBookList(
  userId: number,
  title: string,
  books: number[]
) {
  const endpoint = `/book-lists/users/${userId}/`;
  const q = await fetch(import.meta.env.VITE_DEV_DB_URL + endpoint, {
    method: "POST",
    body: JSON.stringify({
      user: userId,
      title: title,
      books: books,
    }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${await CurrentAccessToken()}`,
    },
  });
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
