<script lang="ts">
  import Rename from "./Rename.svelte";
  import Create from "./Create.svelte";
  import { setContext } from "svelte";
  import AskConsentConfirm from "./AskConsentConfirm.svelte";
  import AskInput from "./AskInput.svelte";
  import BookListTable from "./Catalog/Table.svelte";
  import { fetchBookListsByUserId } from "../../lib/backendService/BookList.service";
  import BookListHeader from "./Catalog/Header.svelte";

  setContext("book_list_name", "旧的书单名字示例");
</script>

<div class="m-auto grid max-w-md gap-4 p-2">
  {#await fetchBookListsByUserId(1000) then bookLists}
    {#each bookLists as bookList}
      <div class="w-full mb-8">
        <BookListHeader title={bookList.title} />
        {#await bookList.getBooksInfo() then books}
          <BookListTable {books} />
        {/await}
      </div>
    {/each}
  {:catch e}
    {e}
  {/await}
  <div class="divider divider-vertical" />
  <AskInput />
  <AskConsentConfirm />
  <Rename />
  <Create />
</div>
