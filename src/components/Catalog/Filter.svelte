<script>
  import { getContext } from "svelte";

  const takeFactor = (factor) => (x) => x % factor === 0;
  const filter = getContext("Filter");
  $: filter.set(takeFactor(factor));

  let factor = 7;
</script>

<input
  type="number"
  class="input input-bordered input-sm"
  bind:value={factor}
/>
