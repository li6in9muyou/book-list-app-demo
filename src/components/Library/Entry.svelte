<script lang="ts">
  import ActionPanel from "../documentCatalog/ActionPanel.svelte";
  import { createEventDispatcher, getContext } from "svelte";
  import { Book } from "../Book/services";
  import { find } from "lodash";
  const dispatch = createEventDispatcher();

  export let book: Book;

  const toggle = getContext("toggle");
  const group = getContext("Selected");

  let meSelected = false;
  $: meSelected = find($group, (b) => b.id === book.id) !== undefined;
  const handleToggle = () => {
    meSelected = !meSelected;
    toggle(book, meSelected);
  };
</script>

<main
  class="card my-1 border bg-base-100 bg-repeat shadow ring-inset ring-info"
  class:ring-4={meSelected}
  on:click={handleToggle}
>
  <section class="card-body pb-2">
    <div class="indicator">
      <div
        class="badge indicator-item badge-lg badge-outline badge-accent -left-12 -top-2 uppercase"
      >
        {book.format}
      </div>
      <div class="mb-4 max-w-2xl break-words">
        {book.title}
      </div>
    </div>
    <footer class="card-actions">
      <ActionPanel thisBook={book.id} />
    </footer>
  </section>
</main>
