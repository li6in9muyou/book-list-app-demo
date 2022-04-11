<script>
  import { authDebugUser } from "../lib/backendService/user.service.js";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<div class="flex justify-center p-4">
  <div
    class="btn btn-sm"
    on:click={() => {
      authDebugUser();
      dispatch("afterLogIn");
    }}
  >
    Log In
  </div>
</div>
