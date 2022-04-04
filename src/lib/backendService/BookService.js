export async function fetchAllBooks() {
  const url = import.meta.env.VITE_DEV_DB_URL + `/api/books`;
  return await (await fetch(url)).json();
}
