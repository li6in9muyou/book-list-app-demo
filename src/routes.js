import Library from "./components/Library.svelte";
import UserLogIn from "./components/userProfile/UserLogIn.svelte";
import UserSignUp from "./components/userProfile/UserSignUp.svelte";
import MyInfo from "./pages/MyInfo.svelte";
import Debug from "./pages/Debug.svelte";
import MyBookLists from "./pages/MyBookLists.svelte";
import DebugBorrowBook from "./pages/DebugBorrowBook.svelte";

export const routes = {
  "/": Library,
  "/userLogin": UserLogIn,
  "/userSignUp": UserSignUp,
  "/myInfo": MyInfo,
  "/myBookLists": MyBookLists,
  "/__debugPage": Debug,
  "/__debugDatabase": DebugBorrowBook,
};

export const links = {
  userSignUp: "#/userSignUp",
  userLogIn: "#/userLogIn",
  myBookLists: "#/myBookLists",
  myInfo: "#/myInfo",
  landing: "#/",
  debugPage: "#/__debugPage",
  database: "#/__debugDatabase",
};
