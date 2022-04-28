<script lang="ts">
  import AuthPrompt from "./AuthPrompt.svelte";
  import { isAuthenticated } from "./stores";

  export let params = {};
</script>

{#if $isAuthenticated}
  <slot />
{:else}
  <AuthPrompt />
{/if}
