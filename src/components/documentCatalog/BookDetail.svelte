<script lang="ts">
  import { fetchBookDetail } from "../../lib/backendService/BookDetailService.js";
  import TextDisplay from "../../lib/uiComponent/TextDisplay.svelte";
  import PleaseWait from "../../lib/uiComponent/PleaseWait.svelte";

  export let thisBook = -1;
  export let shouldShow = false;
</script>

{#if shouldShow}
  <div class="mt-4">
    {#await fetchBookDetail(thisBook)}
      <div class="border-info border rounded pr-2">
        <PleaseWait msg="详情加载中" />
      </div>
    {:then detail}
      <TextDisplay text={detail} />
    {/await}
  </div>
{/if}
