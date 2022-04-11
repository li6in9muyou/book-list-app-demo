<script lang="ts">
  import ActionPanel from "./ActionPanel.svelte";
  import {
    fileNameWithoutExtension,
    takeExtension,
  } from "../../lib/utility.js";
  import { Book } from "../../lib/backendService/book.service";

  export let book: Book;
</script>

<main class="card mx-4 my-1 border bg-base-100 shadow">
  <section class="card-body pb-2">
    <div class="indicator">
      <div
        class="badge indicator-item badge-outline badge-lg badge-accent -left-12 -top-2 uppercase"
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
