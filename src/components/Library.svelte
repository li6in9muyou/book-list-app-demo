<script>
  import DocumentCard from "./documentCatalog/DocumentCard.svelte";
  import VirtualScroll from "@sveltejs/svelte-virtual-list";
  import PleaseWait from "../lib/uiComponent/PleaseWait.svelte";
  import SearchBar from "./searchPage/SearchBar.svelte";
  import { fileNameWithoutExtension } from "../lib/utility.js";
  import SearchTip from "./searchPage/SearchTip.svelte";
  import EmbeddedAlert from "../lib/uiComponent/EmbeddedAlert.svelte";
  import { fetchAllBooks } from "../lib/backendService/BookService.js";
  import NavBar from "./NavBar/NavBar.svelte";

  let all_fucking_ebooks = [];

  const populate_books = async () =>
    (all_fucking_ebooks = await fetchAllBooks());

  let error = {};
  let books_to_show = [];
  let showing_count;
  $: showing_count = books_to_show.length;
</script>

<svelte:head>
  <title>盗版图书馆</title>
  <link
    href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📚</text></svg>"
    rel="icon"
  />
</svelte:head>
<main class="mx-auto flex h-screen max-w-4xl flex-col">
  <NavBar />

  <div class="flex flex-col justify-between gap-4 p-4">
    <SearchBar
      bind:error
      bind:hay={all_fucking_ebooks}
      bind:results={books_to_show}
      getKey={(e) => fileNameWithoutExtension(e.path)}
    />
    <SearchTip {showing_count} good={error.detail === ""} />
  </div>

  <section class="flex-1 overflow-y-auto">
    {#await populate_books()}
      <PleaseWait msg="图书正在加载" />
    {:then books}
      <VirtualScroll items={books_to_show} let:item>
        <DocumentCard book={item} />
      </VirtualScroll>
    {:catch error}
      <div class="p-4 pt-0">
        <EmbeddedAlert
          text="加载失败了，原因是：{error.message.toLowerCase()}"
          color="error"
        />
      </div>
    {/await}
  </section>
</main>
