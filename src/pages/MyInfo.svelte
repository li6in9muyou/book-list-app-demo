<script>
  import {
    CurrentAccessToken,
    CurrentUser,
  } from "../lib/backendService/user.service";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<div class="flex flex-col gap-4 p-4">
  <div
    class="break-all rounded rounded-lg bg-primary p-4 text-xl text-primary-content"
  >
    我的书单页面，我是{$CurrentUser}，我的accessToken是{$CurrentAccessToken}
  </div>
  <button
    class="btn btn-accent btn-lg font-mono normal-case"
    on:click={() => dispatch("routeEvent", { afterLogIn: true })}
  >
    发送afterDeleteAccount事件
  </button>
  <button
    class="btn btn-accent btn-lg font-mono normal-case"
    on:click={() => dispatch("routeEvent", { afterLogIn: true })}
  >
    发送afterLogOut事件
  </button>
  <button
    class="btn btn-accent btn-lg font-mono normal-case"
    on:click={() => dispatch("routeEvent", { afterLogIn: true })}
  >
    发送afterSignUp事件
  </button>
  <button
    class="btn btn-accent btn-lg font-mono normal-case"
    on:click={() => dispatch("routeEvent", { afterLogIn: true })}
  >
    发送afterLogIn事件
  </button>
</div>
