<script lang="ts">
  import { md } from "../../lib/utility.js";
  import { CurrentUsername, isAuthenticated } from "../userProfile/stores";
</script>

{#if $isAuthenticated}
  <label class="btn btn-ghost max-w-full justify-center px-2" tabindex="0">
    <span class="truncate"> {$CurrentUsername} </span>
  </label>
{:else}
  <button
    class="btn btn-outline btn-md rounded-xl rounded items-center"
    class:btn-disabled={$md}
  >
    <span>还没有登录</span>
  </button>
{/if}
