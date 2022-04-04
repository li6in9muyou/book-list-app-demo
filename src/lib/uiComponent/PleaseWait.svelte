<script>
  import { sleep } from "../utility.js";
  import FaExclamation from "svelte-icons/fa/FaExclamation.svelte";

  export let msg = "加载中";
  export let timeout = 3000;
  export let err = "行动失败，尝试刷新页面";
</script>

<div class="flex items-center space-x-4 p-2">
  {#await sleep(timeout)}
    <div
      class="ml-4 w-6 h-6 text-info animate-spin radial-progress"
      style="--value:80;--size:1.5rem"
    />
    <span>{msg}</span>
  {:then _}
    <div class="ml-4 w-6 h-6 text-error">
      <FaExclamation />
    </div>
    <span>{err}</span>
  {/await}
</div>
