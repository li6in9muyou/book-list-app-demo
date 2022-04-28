<script lang="ts">
  import { addManyBooks, BookList, removeManyBooks } from "./services";
  import { getNotificationsContext } from "svelte-notifications";
  import { getNotify } from "../../lib/utility.js";
  import { createEventDispatcher, onMount } from "svelte";
  import { CurrentUserId } from "../userProfile/stores";

  const dispatch = createEventDispatcher();

  const { success, info } = getNotify(getNotificationsContext());
  export let thisBookList: BookList;
  export let thisBooks: number[];

  let toggle;
  let toggleState: boolean;

  const contains = thisBooks.every((b) => thisBookList.books.indexOf(b) !== -1);
  const intersect =
    thisBookList.books.some((b) => thisBooks.indexOf(b) === -1) &&
    thisBooks.some((b) => thisBookList.books.indexOf(b) === -1) &&
    thisBooks.some((b) => thisBookList.books.indexOf(b) !== -1);
  const disjoint =
    thisBookList.books.every((b) => thisBooks.indexOf(b) === -1) &&
    thisBooks.every((b) => thisBookList.books.indexOf(b) === -1);

  onMount(() => {
    if (intersect) {
      toggle.indeterminate = true;
    } else {
      if (contains) {
        toggleState = true;
      }
      if (disjoint) {
        toggleState = false;
      }
    }
  });

  async function handleChange() {
    if (toggleState) {
      await addManyBooks($CurrentUserId, thisBookList.id, thisBooks);
      success(`已加入书单"${thisBookList.title}"`);
    } else {
      await removeManyBooks($CurrentUserId, thisBookList.id, thisBooks);
      info(`已从书单"${thisBookList.title}"中移除`);
    }
    dispatch("pleaseCloseModal");
  }
</script>

<label class="label cursor-pointer justify-start">
  <input
    bind:checked={toggleState}
    class="checkbox checkbox-secondary checkbox-xs"
    on:change={handleChange}
    type="checkbox"
    bind:this={toggle}
  />
  <span class="label-text ml-2 truncate text-lg">
    {thisBookList.title}
  </span>
</label>
