<script lang="ts">
  import ActionPanel from "./ActionPanel.svelte";
  import {
    fileNameWithoutExtension,
    takeExtension,
  } from "../../lib/utility.js";
  import { Book } from "../../lib/backendService/book.service";

  export let book: Book;
</script>

<main class="card mx-4 my-3 bg-base-100 shadow-lg">
  <section class="card-body">
    <header class="card-title">
      <div class="badge badge-lg badge-outline badge-primary p-4 font-mono">
        {takeExtension(book.path)}
      </div>
      <div class="mx-6 max-w-2xl break-words">
        {fileNameWithoutExtension(book.path)}
      </div>
    </header>
    <footer class="card-actions">
      <ActionPanel thisBook={book.id} />
    </footer>
  </section>
</main>
