<script>
  import AuthedNav from "./AuthedNav.svelte";
  import GuestNav from "./GuestNav.svelte";
  import UserAvatar from "./UserAvatar.svelte";
  import { isAuthenticated } from "../../lib/backendService/UserService.js";
</script>

<div class="dropdown-end dropdown w-1/2">
  <div class="flex max-w-full justify-end">
    <UserAvatar />
  </div>
  <ul
    class="dropdown-content menu rounded-box menu-compact
                mt-3 min-w-max border border-2 bg-base-100 p-2 shadow-lg"
    tabindex="0"
  >
    {#if $isAuthenticated}
      <AuthedNav />
    {:else}
      <GuestNav />
    {/if}
  </ul>
</div>
