<script lang="ts">
  import { addManyBooks, BookList } from "./services";
  import { Book } from "../Book/services";
  import { map } from "lodash";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let thisBookList: BookList;
  export let thisBooks: Book[];
  export let userId: number;

  let loading = false;
  let disabled = false;
  const handleAppend = async () => {
    loading = true;
    await addManyBooks(
      userId,
      thisBookList.id,
      map(thisBooks, (book) => book.id)
    );
    loading = false;
    disabled = true;
    dispatch("appended");
  };
</script>

<div
  class="btn btn-outline btn-info btn-sm text-info-content"
  class:loading
  class:btn-disabled={disabled}
  on:click={handleAppend}
>
  <span> 添加到此书单 </span>
</div>
