<script lang="ts">
  import PleaseWait from "../lib/uiComponent/PleaseWait.svelte";
  import SearchBar from "./searchPage/SearchBar.svelte";
  import { fileNameWithoutExtension } from "../lib/utility.js";
  import SearchTip from "./searchPage/SearchTip.svelte";
  import EmbeddedAlert from "../lib/uiComponent/EmbeddedAlert.svelte";
  import { Book, fetchAllBooks } from "./Book/services";
  import Catalog from "./documentCatalog/Catalog.svelte";

  let all_fucking_ebooks: Book[] = [];

  let error = {};
  let books_to_show: Book[] = [];
  $: showing_count = books_to_show.length;

  const populate_books = async () => {
    all_fucking_ebooks = await fetchAllBooks();
  };
</script>

<div class="h-full w-full">
  <main class="mx-auto flex h-full max-w-4xl flex-col">
    <div class="flex flex-col justify-between gap-2 p-4 py-1">
      <SearchBar
        bind:error
        bind:hay={all_fucking_ebooks}
        bind:results={books_to_show}
        getKey={(e) => fileNameWithoutExtension(e.path)}
      />
      <SearchTip {showing_count} good={error.detail === ""} />
    </div>
    <div class="flex-1">
      <section class="h-px min-h-full overflow-y-auto overflow-x-hidden">
        {#await populate_books()}
          <PleaseWait msg="图书正在加载" />
        {:then _}
          <Catalog {books_to_show} />
        {:catch error}
          <div class="p-4 pt-0">
            <EmbeddedAlert
              text="加载失败了，原因是：{error.message.toLowerCase()}"
              color="error"
            />
          </div>
        {/await}
      </section>
    </div>
  </main>
</div>
