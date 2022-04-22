<script lang="ts">
  import { isEmpty } from "lodash";
  import Entry from "./Entry.svelte";

  export let entries;
</script>

{#if isEmpty($entries)}
  <div class="w-fit rounded bg-error p-4 text-error-content">
    no entries found
  </div>
{:else}
  <div class="flex flex-wrap gap-4">
    {#each $entries as x}
      <Entry {x} />
    {/each}
  </div>
{/if}
