<script>
  import { isAuthenticated } from "../backendService/user.service";
  import AuthPrompt from "./AuthPrompt.svelte";

  export let params = {};
</script>

{#if $isAuthenticated}
  <slot />
{:else}
  <AuthPrompt />
{/if}
