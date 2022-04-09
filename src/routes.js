import Library from "./components/Library.svelte";
import UserLogIn from "./components/userProfile/UserLogIn.svelte";
import UserSignUp from "./components/userProfile/UserSignUp.svelte";
import MyInfo from "./pages/MyInfo.svelte";

export const routes = {
  "/": Library,
  "/userLogin": UserLogIn,
  "/userSignUp": UserSignUp,
  "/myInfo": MyInfo,
};

export const links = {
  userSignUp: "#/userSignUp",
  userLogIn: "#/userLogIn",
  myBookLists: "#/myBookLists",
  myInfo: "#/myInfo",
  landing: "#/",
};
