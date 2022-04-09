import Library from "./components/Library.svelte";
import MyBookLists from "./pages/MyBookLists.svelte";
import OnBoard from "./components/userProfile/OnBoard.svelte";
import EmBark from "./components/userProfile/EmBark.svelte";

export const routes = {
  "/": Library,
  "/myBookLists": MyBookLists,
  "/onBoard": OnBoard,
  "/emBark": EmBark,
};

export const links = {
  onBoard: "#/onBoard",
  emBark: "#/emBark",
  myBookLists: "#/myBookLists",
  landing: "#/",
};
