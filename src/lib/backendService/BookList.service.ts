import { CurrentUserInfo } from "./user.service";
import { get } from "svelte/store";

export class BookList {
  userId: number;
  title: string;
  id: string;
  books: number[];
}

export async function BookList_create(title, books: number[] = []) {
  const user = get(CurrentUserInfo);
  return await fetch(import.meta.env.VITE_DEV_DB_URL + `/api/book-lists`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      books: books,
      userId: user.id,
    }),
  });
}

export async function fetchAllBookListOfUser(
  user: string
): Promise<BookList[]> {
  if (user.length > 0) {
    return await (
      await fetch(import.meta.env.VITE_DEV_DB_URL + `/api/${user}/book-lists`)
    ).json();
  }
  throw `bad user name [${user}], length: ${user.length}`;
}

async function getBookListById(id: string): Promise<BookList> {
  return await (
    await fetch(import.meta.env.VITE_DEV_DB_URL + `/api/book-lists/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
  ).json();
}

export async function BookList_removeBooks(
  id: string,
  deadBooks: number[]
): Promise<any> {
  const existingBooks = await BookList_fetchBooks(id);
  return await (
    await fetch(import.meta.env.VITE_DEV_DB_URL + `/api/book-lists/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        books: existingBooks.filter((id) => deadBooks.indexOf(id) === -1),
      }),
    })
  ).json();
}

async function BookList_fetchBooks(id: string): Promise<number[]> {
  return (await getBookListById(id)).books;
}

export async function BookList_addBooks(
  id: string,
  newBooks: number[]
): Promise<any> {
  const existingBooks = await BookList_fetchBooks(id);
  return await fetch(
    import.meta.env.VITE_DEV_DB_URL + `/api/book-lists/${id}`,
    {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        books: [...newBooks, ...existingBooks],
      }),
    }
  );
}

// export async function deleteBookList(user, title) {
//   return await fetch(
//     import.meta.env.VITE_DEV_DB_URL + `/api/${user}/book-lists/${title}`,
//     {
//       method: "DELETE",
//     }
//   );
// }
//
// export async function fetchBookListsContainOneBook(user, book) {
//   return await fetchAllBookListOfUser(user).filter(
//     (thisList) => thisList.books.indexOf(book) !== -1
//   );
// }
