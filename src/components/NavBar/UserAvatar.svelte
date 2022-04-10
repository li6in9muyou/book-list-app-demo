<script>
  import {
    CurrentUser,
    isAuthenticated,
  } from "../../lib/backendService/user.service";
</script>

{#if $isAuthenticated}
  <label class="btn btn-ghost max-w-full justify-center px-2" tabindex="0">
    <span class="truncate"> {$CurrentUser} </span>
  </label>
{:else}
  <button
    class="btn btn-outline btn-md rounded-xl rounded border-2 btn-secondary items-center"
  >
    <span>还没有登录</span>
  </button>
{/if}
