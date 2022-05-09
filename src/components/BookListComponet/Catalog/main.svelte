<script lang="ts">
  import Table from "./Table.svelte";
  import Header from "./Header.svelte";
  import { createBookList, deleteBookList } from "../BookList.service.js";
  import { fetchBookListsByUserId, updateBookList } from "../services";
  import { CurrentUserId } from "../../userProfile/stores";

  const removeList = async (e) => {
    await deleteBookList($CurrentUserId, e.detail.book_list_title);
  };
  const removeBook = async (book_list_title, e) => {
    await updateBookList(
      $CurrentUserId,
      book_list_title,
      [e.detail.book_id],
      false
    );
  };
  const rename = async ({ detail }) => {
    const { new_name, old_name } = detail;
    const oldList = (await fetchBookListsByUserId($CurrentUserId)).find(
      (list) => {
        return old_name === list.title;
      }
    );
    if (oldList === undefined) {
      return console.error("old name does not exists");
    }
    await createBookList($CurrentUserId, new_name, oldList.books);
  };
</script>

<div class="p-4 md:mx-auto md:max-w-lg">
  <div class="mb-4 text-xl text-primary">我的书单</div>
  {#await fetchBookListsByUserId($CurrentUserId) then bookLists}
    <div class="flex flex-col gap-6">
      {#each bookLists as bookList}
        <div>
          <Header
            title={bookList.title}
            on:remove={removeList}
            on:rename={rename}
          />
          {#await bookList.getBooksInfo() then books}
            <Table {books} on:remove={(e) => removeBook(bookList.id, e)} />
          {/await}
        </div>
      {/each}
    </div>
  {/await}
</div>
