<script lang="ts">
  import {
    BookList,
    BookList_addBooks,
    BookList_removeBooks,
  } from "../../components/BookListComponet/BookList.service";
  import { getNotificationsContext } from "svelte-notifications";
  import { getNotify } from "../utility.js";
  import { getContext } from "svelte";

  const { success, info } = getNotify(getNotificationsContext());

  export let thisList: BookList;
  export let thisBook: number = getContext("thisBook");
  export let thisGroup: number[] = getContext("thisGroup");
  let bookInBookList = thisList.books.indexOf(thisBook) !== -1;
  // let groupContainedByBookList = thisGroup.every((book) => {
  //   return thisList.books.indexOf(book) !== -1;
  // });

  async function handleChange() {
    if (thisBook !== -1) {
      if (bookInBookList) {
        await BookList_addBooks(thisList.id, [thisBook]);
        success(`已加入书单"${thisList.title}"`);
      } else {
        await BookList_removeBooks(thisList.id, [thisBook]);
        info(`已从书单"${thisList.title}"中移除`);
      }
    } else {
      console.log("batchUpdate");
      if (bookInBookList) {
        await BookList_addBooks(thisList.id, thisGroup);
        success(`已加入书单"${thisList.title}"`);
      } else {
        await BookList_removeBooks(thisList.id, thisGroup);
        info(`已从书单"${thisList.title}"中移除`);
      }
    }
  }
</script>

<label class="label cursor-pointer justify-start">
  <input
    bind:checked={bookInBookList}
    class="checkbox checkbox-secondary checkbox-xs"
    on:change={handleChange}
    type="checkbox"
  />
  <span class="label-text ml-2 truncate text-lg">
    {thisList.title || "未命名的书单-" + thisList.id}
  </span>
</label>
