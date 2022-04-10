<script lang="ts">
  import {
    BookList,
    BookList_addBooks,
    BookList_removeBooks,
  } from "../backendService/BookList.service";
  import { getNotificationsContext } from "svelte-notifications";
  import { getNotify } from "../utility.js";

  const { success, info } = getNotify(
    getNotificationsContext().addNotification
  );

  export let thisBook = -1;
  export let list = {};
  let bookInBookList = list.books.indexOf(thisBook) !== -1;

  async function handleChange() {
    if (bookInBookList) {
      await BookList_addBooks(list.id, [thisBook]);
      success(`已加入书单"${list.id}"`);
    } else {
      await BookList_removeBooks(list.id, [thisBook]);
      info(`已从书单"${list.id}"中移除`);
    }
  }
</script>

<label class="label cursor-pointer justify-start">
  <input
    bind:checked={bookInBookList}
    class="checkbox checkbox-secondary checkbox-md"
    on:change={handleChange}
    type="checkbox"
  />
  <span class="label-text ml-2 truncate">{list.id}</span>
</label>
