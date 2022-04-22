import Library from "./components/Library.svelte";
import UserLogIn from "./components/userProfile/UserLogIn.svelte";
import UserSignUp from "./components/userProfile/UserSignUp.svelte";
import MyInfo from "./pages/DebugSendNotification.svelte";
import Debug from "./pages/Debug.svelte";
import MyBookLists from "./pages/MyBookLists.svelte";
import DebugBorrowBook from "./pages/DebugBorrowBook.svelte";
import DebugBookListsPouchDB from "./pages/DebugBookListsPouchDB.svelte";
import MyBorrowingBooks from "./pages/MyBorrowingBooks/main.svelte";

export const routes = {
  "/": Library,
  "/userLogin": UserLogIn,
  "/userSignUp": UserSignUp,
  "/myInfo": MyInfo,
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
  myInfo: "#/myInfo",
  landing: "#/",
  debugPage: "#/__debugPage",
  database: "#/__debugDatabase",
  debugBookList: "#/__debugBookListPouchDB",
};
