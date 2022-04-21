<script lang="ts">
  import { isEmpty } from "lodash";
  import VirtualScroll from "@sveltejs/svelte-virtual-list";
  import Entry from "./Entry.svelte";
  import EmbeddedAlert from "../../lib/uiComponent/EmbeddedAlert.svelte";

  export let entries;
</script>

<section
  class="flex h-px min-h-full flex-col overflow-y-auto overflow-x-hidden"
>
  {#if isEmpty($entries)}
    <div class="p-4">
      <EmbeddedAlert text="没有结果" color="info" />
    </div>
  {:else}
    <VirtualScroll items={$entries} let:item>
      <Entry book={item} />
    </VirtualScroll>
  {/if}
</section>
