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
>
  <section class="card-body pb-2">
    <div class="indicator" on:click={handleToggle}>
      <div
        class="badge indicator-item badge-outline badge-lg badge-accent -left-12 -top-2 text-xs uppercase"
      >
        {book.format}
      </div>
      <div class="mb-4 w-full break-words border-b border-b-neutral">
        {book.title}
      </div>
    </div>
    <footer class="card-actions">
      <ActionPanel thisBook={book.id} />
    </footer>
  </section>
</main>
