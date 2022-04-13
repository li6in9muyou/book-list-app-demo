<script lang="ts">
  import ActionPanel from "./ActionPanel.svelte";
  import {
    fileNameWithoutExtension,
    takeExtension,
  } from "../../lib/utility.js";
  import { Book } from "../../lib/backendService/book.service";
  import { writable } from "svelte/store";
  import { createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();

  export let book: Book;
  export let thisGroup: writable<Set<number>>;

  let selectedMe = false;

  onMount(() => {
    thisGroup.subscribe((s) => {
      selectedMe = $thisGroup.has(book.id);
    });
  });
</script>

<label>
  <input
    type="checkbox"
    class="hidden"
    value={book.id}
    on:click={() => {
      selectedMe = !selectedMe;
      dispatch("toggleSelection", { id: book.id, expected: selectedMe });
    }}
  />
  <main
    class="card my-1 border bg-base-100 bg-repeat shadow ring-inset ring-info"
    class:ring-4={selectedMe}
  >
    <section class="card-body pb-2">
      <div class="indicator">
        <div
          class="badge indicator-item badge-lg badge-outline badge-accent -left-12 -top-2 uppercase"
        >
          {takeExtension(book.path)}
        </div>
        <div class="mb-4 max-w-2xl break-words">
          {fileNameWithoutExtension(book.path)}
        </div>
      </div>
      <footer class="card-actions">
        <ActionPanel thisBook={book.id} />
      </footer>
    </section>
  </main>
</label>
