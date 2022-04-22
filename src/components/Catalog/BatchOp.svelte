<script>
  import { getContext } from "svelte";

  const batch = getContext("BatchOperation");
</script>

<div class="input-group">
  <div class="btn btn-sm" on:click={batch.all}>全选</div>
  <div class="btn btn-sm" on:click={batch.reverse}>反选</div>
  <div class="btn btn-sm" on:click={batch.clear}>清空</div>
</div>
