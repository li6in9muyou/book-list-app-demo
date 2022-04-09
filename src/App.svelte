<script>
  import Notifications from "svelte-notifications";
  import Alert from "./lib/uiComponent/Alert.svelte";
  import NavBar from "./components/NavBar/NavBar.svelte";
  import Router from "svelte-spa-router";
  import { routes } from "./routes.js";
</script>

<svelte:head>
  <title>盗版图书馆</title>
  <link
    href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📚</text></svg>"
    rel="icon"
  />
</svelte:head>

<Notifications item={Alert}>
  <div class="flex h-screen flex-col">
    <NavBar />
    <Router {routes} />
  </div>
</Notifications>
