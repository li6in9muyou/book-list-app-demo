<script lang="ts">
  import Notifications from "svelte-notifications";
  import Alert from "./lib/uiComponent/Alert.svelte";
  import NavBar from "./components/NavBar/NavBar.svelte";
  import Router, { push } from "svelte-spa-router";
  import { links, routes } from "./routes.js";
  import { get } from "lodash/object.js";

  async function routeEvent(event) {
    function isEvent(e) {
      return get(event, `detail.${e}`, false);
    }

    if (isEvent("afterLogIn")) {
      if (!event.detail.redirect) {
        console.warn("did not specify redirect link", event);
      }
      await push(get(event, "detail.redirect", links.landing));
      return;
    }

    console.info("did not catch this event", event);
  }
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
    <Router {routes} on:routeEvent={routeEvent} />
  </div>
</Notifications>
