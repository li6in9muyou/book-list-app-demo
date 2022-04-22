<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<div class="dropdown dropdown-top w-full">
  <label tabindex="0" class="btn  btn-sm w-full">批量选择</label>
  <div
    tabindex="0"
    class="dropdown-content mb-4 flex w-full flex-col gap-2 rounded"
  >
    <div class="btn btn-sm w-full" on:click={() => dispatch("all")}>全选</div>
    <div class="btn btn-sm w-full" on:click={() => dispatch("reverse")}>
      反选
    </div>
    <div class="btn btn-sm w-full" on:click={() => dispatch("clear")}>清空</div>
  </div>
</div>
