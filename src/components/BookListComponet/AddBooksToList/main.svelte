<script lang="ts">
  import Append from "../Append.svelte";
  import Create from "../Create.svelte";
  import { fetchBookListsByUserId } from "../../../lib/backendService/BookList.service.ts";
  import { Book } from "../../../lib/backendService/book.service.ts";

  export let thisBooks: Book[];
  export let userId: number;

  let shouldShow = false;
</script>

<div class="flex flex-col rounded border-2 p-2">
  <h3 class="pb-2 text-lg font-bold">添加到书单……</h3>
  <div class="collapse" tabindex="0">
    <input bind:checked={shouldShow} type="checkbox" />
    <div class="collapse-title flex">
      <svg
        class="mr-2 inline h-6 w-6 fill-accent"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
      </svg>
      <span>加入到新的书单</span>
    </div>
    <div class="collapse-content">
      <Create init_books={thisBooks} />
    </div>
  </div>
  <div class="flex flex-1 flex-col gap-4 overflow-auto rounded border px-2">
    {#await fetchBookListsByUserId(userId) then bookLists}
      {#each bookLists as bookList}
        <div
          class="flex border-b border-b-neutral p-2 justify-between items-center"
        >
          <span class="truncate text-lg font-mono w-2/3">
            {bookList.title}
          </span>
          <Append {thisBooks} thisBookList={bookList} {userId} />
        </div>
      {/each}
    {:catch e}
      {e}
    {/await}
  </div>
</div>
