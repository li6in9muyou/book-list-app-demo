<script>
  import { authDebugUser } from "../lib/backendService/user.service.js";
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  const dispatch = createEventDispatcher();
</script>

<div class="m-auto flex max-w-sm justify-center p-4" in:fade={{ delay: 350 }}>
  <div
    class="btn btn-outline btn-sm w-full"
    on:click={() => {
      authDebugUser();
      dispatch("afterLogIn");
    }}
  >
    Log In
  </div>
</div>
