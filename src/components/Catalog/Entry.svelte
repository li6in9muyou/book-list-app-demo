<script lang="ts">
  import { getContext, onMount } from "svelte";

  export let x;

  const toggleSelect = getContext("toggle");
  const group = getContext("Selected");

  let meSelected = false;
  $: meSelected = $group.indexOf(x) !== -1;
  const handleSelection = () => {
    meSelected = !meSelected;
    toggleSelect(x, meSelected);
  };
</script>

<div
  class="badge cursor-pointer rounded"
  class:badge-outline={!meSelected}
  on:click={handleSelection}
>
  {x}
</div>
