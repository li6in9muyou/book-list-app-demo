import { get, Writable, writable } from "svelte/store";
import { concat, isEmpty, last, pullAll } from "lodash";
import PouchDB from "pouchdb";
import { CurrentUserId, CurrentUserInfo } from "../userProfile/stores";
import { BookList } from "./services";

const db = new PouchDB("dbBookLists");

const genId = (user, list) => `${user} ${list}`;

export async function updateBooksBookList(
  userId: number,
  title: string,
  books: number[],
  shouldInList: boolean
) {
  db.get(genId(userId, title)).then((doc) => {
    if (shouldInList) {
      doc.books = [...new Set(concat(doc.books, books))];
    } else {
      pullAll(doc.books, books);
    }
    db.put({
      ...doc,
      _rev: doc._rev,
    });
  });
}

export async function createBookList(
  userId: number,
  title: string,
  books: number[] = []
) {
  const id = genId(userId, title);
  try {
    await db.get(id);
  } catch (e) {
    return await db.put({
      _id: id,
      books: books,
      createdBy: userId,
      title: title,
    });
  }
  throw { status: 409, message: "bookList already exists" };
}

export async function deleteBookList(userId: number, title: string) {
  const id = genId(userId, title);
  const doc = await db.get(id);
  doc._deleted = true;
  await db.put(doc);
}

export async function BookList_create(title: string, books: number[] = []) {
  const userId = get(CurrentUserInfo).id;
  return await createBookList(userId, title, books);
}

export async function fetchBookListsByUserId(
  userId: number
): Promise<BookList[]> {
  const doc = await db.allDocs({
    include_docs: true,
    startkey: userId.toString(),
    endkey: userId.toString() + "\ufff0",
  });
  return doc.rows
    .filter(({ doc }) => !isEmpty(doc))
    .map(({ doc }) => BookList.fromPouchDocument(doc));
}

export async function BookList_removeBooks(
  bookListId: string,
  deadBooks: number[]
): Promise<void> {
  return updateBooksBookList(
    get(CurrentUserId),
    last(bookListId.split(" ")),
    deadBooks,
    false
  );
}

export async function BookList_addBooks(
  bookListId: string,
  newBooks: number[]
): Promise<any> {
  return updateBooksBookList(
    get(CurrentUserId),
    last(bookListId.split(" ")),
    newBooks,
    true
  );
}

export async function fetchBookListsContainOneBook(user, book) {
  return (await fetchBookListsByUserId(user)).filter(
    (thisList) => thisList.books.indexOf(book) !== -1
  );
}

const cache = new Map<number, BookList[]>();
export function fetchUserBookLists(
  userId: number
): Writable<Promise<BookList[]>> {
  const store = writable(new Promise<BookList[]>(() => {}));

  if (cache.has(userId)) {
    store.set(Promise.resolve(cache.get(userId)));
  }

  fetchBookListsByUserId(userId).then((lists) => {
    cache.set(userId, lists);
    store.set(Promise.resolve(lists));
  });

  return store;
}
