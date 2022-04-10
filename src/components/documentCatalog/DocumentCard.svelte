<script>
  import ActionPanel from "./ActionPanel.svelte";
  import {
    fileNameWithoutExtension,
    takeExtension,
  } from "../../lib/utility.js";

  export let book;
</script>

<main class="card mx-4 my-3 bg-base-100 shadow-lg">
  <section class="card-body">
    <header class="card-title">
      <div class="badge badge-lg badge-outline badge-primary p-4 font-mono">
        {takeExtension(book.path)}
      </div>
      <div class="mx-6 max-w-2xl break-all">
        {fileNameWithoutExtension(book.path)}
      </div>
    </header>
    <footer class="card-actions">
      <ActionPanel subject={book.id} />
    </footer>
  </section>
</main>
