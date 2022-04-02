<script>
  import MdExitToApp from "svelte-icons/md/MdExitToApp.svelte";
  import { CurrentUser } from "../lib/UserService.js";
  import DocumentCard from "./DocumentCard.svelte";
  import VirtualScroll from "@sveltejs/svelte-virtual-list";
  import PleaseWait from "../lib/PleaseWait.svelte";
  import SearchBar from "./searchPage/SearchBar.svelte";
  import { fileNameWithoutExtension } from "./utility.js";

  let all_fucking_ebooks = [];

  const populate_books = async () => {
    const url = "http://localhost:8081/api/books";
    all_fucking_ebooks = await (await fetch(url)).json();
  };

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
<main class="flex flex-col h-screen">
  <div class="navbar bg-base-200 gap-4">
    <div class="flex">
      <a class="btn btn-ghost normal-case text-2xl font-serif">盗版图书馆</a>
    </div>
    <SearchBar
      bind:error
      bind:hay={all_fucking_ebooks}
      bind:results={books_to_show}
      getKey={(e) => fileNameWithoutExtension(e.path)}
    />
    <div class="dropdown dropdown-end ml-auto">
      <label class="btn btn-ghost avatar justify-center" tabindex="0">
        {$CurrentUser}
      </label>
      <ul
        class="mt-3 p-2 shadow menu menu-compact
                dropdown-content bg-base-100 rounded-box w-52"
        tabindex="0"
      >
        <li>
          <a class="text-red-500 font-bold text-2xl text-warn font-mono">
            <div class="w-8 h-8">
              <MdExitToApp />
            </div>
            Logout
          </a>
        </li>
      </ul>
    </div>
  </div>
  <section class="overflow-y-auto flex-1">
    {#await populate_books()}
      <PleaseWait msg="图书正在加载" />
    {:then books}
      <VirtualScroll items={books_to_show} let:item>
        <DocumentCard book={item} />
      </VirtualScroll>
    {:catch error}
      <h1>加载失败了，原因是：{error.message.toLowerCase()}</h1>
    {/await}
  </section>
</main>
