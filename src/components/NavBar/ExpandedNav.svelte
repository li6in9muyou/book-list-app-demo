<script>
  import { isAuthenticated } from "../../lib/backendService/UserService.js";
  import AuthedNav from "./AuthedNav.svelte";
  import GuestNav from "./GuestNav.svelte";
  import UserAvatar from "./UserAvatar.svelte";
</script>

<div class="w-3/4 max-w-fit items-stretch xl:justify-end">
  <ul
    class="menu rounded-box menu-horizontal menu-compact
                relative w-fit border border-accent bg-base-100 py-0"
  >
    {#if $isAuthenticated}
      <AuthedNav />
    {:else}
      <GuestNav />
    {/if}
  </ul>
  <div class="mx-4 w-1/3">
    <div class="max-w-full">
      <UserAvatar />
    </div>
  </div>
</div>
