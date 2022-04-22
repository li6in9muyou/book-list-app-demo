<script lang="ts">
  import { fetchBookListsByUserId } from "../../lib/backendService/BookList.service.js";
  import Create from "../BookListComponet/Create.svelte";
  import { isEmpty } from "lodash";
  import EmbeddedAlert from "../../lib/uiComponent/EmbeddedAlert.svelte";
  import Append from "../BookListComponet/Append.svelte";
  import { Book } from "../../lib/backendService/book.service.js";

  export { thisBook, userId };

  let thisBook: Book = new Book({ id: 1111, path: "some book.pdf" });
  let userId: number = 1000;

  const notify = (e) => {
    console.log("notify user", e.type);
  };
</script>

<div class="p-2">
  <h3 class="text-lg font-bold">添加到书单……</h3>
  <div class="divider divider-vertical" />
  <div class="flex flex-col gap-y-2">
    {#await fetchBookListsByUserId(userId) then bookLists}
      {#if isEmpty(bookLists)}
        <div class="p-4">
          <EmbeddedAlert text="您还没有书单" />
        </div>
      {:else}
        {#each bookLists as bookList}
          <div class="px-2">
            <div
              class="flex items-center justify-between gap-4 border p-2 shadow"
            >
              <span class="ml-4 truncate">{bookList.title}</span>
              <Append
                thisBookList={bookList}
                thisBooks={[thisBook]}
                {userId}
                on:appended={notify}
              />
            </div>
          </div>
        {/each}
      {/if}
    {/await}
  </div>
  <div class="divider divider-vertical" />
  <div class="p-2">
    <Create on:created={notify} />
  </div>
</div>
