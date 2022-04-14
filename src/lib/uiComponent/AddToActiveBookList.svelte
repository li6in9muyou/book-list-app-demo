<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let bookId = -1;
  let inList = false;
  $: {
    dispatch("bookChange", { bookId, expected: inList });
  }
</script>

<label
  class="badge badge-outline badge-secondary select-none rounded rounded-md font-mono shadow transition-colors duration-300"
  class:badge-outline={!inList}
>
  <input type="checkbox" class="checkbox" bind:checked={inList} />
</label>
