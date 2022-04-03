export async function fetchAllBookListOfUser(user) {
  return await (
    await fetch(import.meta.env.VITE_DEV_DB_URL + `/api/${user}/book-lists`)
  ).json();
}

export async function createBookList(user, title, books = []) {
  return await fetch(
    import.meta.env.VITE_DEV_DB_URL + `/api/${user}/book-lists`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: title,
        books: books,
        creator: user,
      }),
    }
  );
}

export async function deleteBookList(user, title) {
  return await fetch(
    import.meta.env.VITE_DEV_DB_URL + `/api/${user}/book-lists/${title}`,
    {
      method: "DELETE",
    }
  );
}

export async function updateBooksInBookList(user, title, newBooks) {
  return await fetch(
    import.meta.env.VITE_DEV_DB_URL + `/api/${user}/book-lists/${title}`,
    {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        books: newBooks,
      }),
    }
  );
}

async function booksInBookList(user, title) {
  const bookListsOfUser = await fetchAllBookListOfUser(user);
  return bookListsOfUser.find((list) => list.id === title).books;
}

export async function addBooksToBookList(user, title, newBooks) {
  const existingBooks = await booksInBookList(user, title);
  return await fetch(
    import.meta.env.VITE_DEV_DB_URL + `/api/${user}/book-lists/${title}`,
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

export async function fetchBookListsContainOneBook(user, book) {
  return await fetchAllBookListOfUser(user).filter(
    (list) => list.books.indexOf(book) !== -1
  );
}
