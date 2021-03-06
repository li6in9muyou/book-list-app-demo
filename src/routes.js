import Library from "./components/Library/main.svelte";
import UserLogIn from "./components/userProfile/UserLogIn.svelte";
import UserSignUp from "./components/userProfile/UserSignUp.svelte";
import DebugSendNotification from "./pages/DebugSendNotification.svelte";
import Debug from "./pages/Debug.svelte";
import MyBookLists from "./components/BookListComponet/Catalog/main.svelte";
import DebugBorrowBook from "./pages/DebugBorrowBook.svelte";
import DebugBookListsPouchDB from "./pages/DebugBookListsPouchDB.svelte";
import MyBorrowingBooks from "./pages/MyBorrowingBooks/main.svelte";

export const routes = {
  "/": Library,
  "/userLogin": UserLogIn,
  "/userSignUp": UserSignUp,
  "/__debugNotifications": DebugSendNotification,
  "/myBookLists": MyBookLists,
  "/__debugPage": Debug,
  "/__debugDatabase": DebugBorrowBook,
  "/__debugBookListPouchDB": DebugBookListsPouchDB,
  "/myBorrowing": MyBorrowingBooks,
};

export const links = {
  myBorrowing: "#/myBorrowing",
  userSignUp: "#/userSignUp",
  userLogIn: "#/userLogIn",
  myBookLists: "#/myBookLists",
  landing: "#/",
  debugNotifications: "#/__debugNotifications",
  debugPage: "#/__debugPage",
  database: "#/__debugDatabase",
  debugBookList: "#/__debugBookListPouchDB",
};
