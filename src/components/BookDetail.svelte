<script>
  import { fetchBookDetail } from "../lib/BookDetailService.js";
  import TextDisplay from "../lib/TextDisplay.svelte";
  import PleaseWait from "../lib/PleaseWait.svelte";

  export let thisBook = -1;
  export let shouldShow = false;
</script>

<div class="mt-4">
  {#if thisBook !== -1 && shouldShow}
    {#await fetchBookDetail(thisBook)}
      <div class="border-info border rounded pr-2">
        <PleaseWait msg="详情加载中" />
      </div>
    {:then detail}
      <TextDisplay text={detail} />
    {/await}
  {/if}
</div>
