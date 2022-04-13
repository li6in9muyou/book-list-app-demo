<script>
  import { setContext } from "svelte";
  import FaArchive from "svelte-icons/fa/FaArchive.svelte";
  import FaInfoCircle from "svelte-icons/fa/FaInfoCircle.svelte";
  import FaArrowUp from "svelte-icons/fa/FaArrowUp.svelte";
  import AddToBookListModal from "../bookListModal/AddToBookListModal.svelte";
  import BookDetail from "./BookDetail.svelte";

  export let thisBook = -1;
  setContext("thisBook", thisBook);

  let shouldShowAddToBookListModal = false;
  let shouldShowDetail = false;
</script>

<div class="flex flex-1 flex-col gap-2">
  <main class="space-x-6">
    <label
      class="btn btn-outline btn-secondary btn-sm content-center items-end"
    >
      <input
        bind:checked={shouldShowAddToBookListModal}
        class="hidden"
        type="checkbox"
      />
      <span class="h-4 w-4">
        <FaArchive />
      </span>
      <span class="ml-2"> 加入书单 </span>
    </label>
    <label
      class="btn btn-outline btn-secondary btn-sm content-center items-end"
    >
      <input bind:checked={shouldShowDetail} class="hidden" type="checkbox" />
      {#if shouldShowDetail}
        <span class="h-4 w-4">
          <FaArrowUp />
        </span>
        <span class="ml-2"> 收起 </span>
      {:else}
        <span class="h-4 w-4">
          <FaInfoCircle />
        </span>
        <span class="ml-2"> 查看详情 </span>
      {/if}
    </label>
  </main>
  <comment>
    <AddToBookListModal
      bind:shouldShow={shouldShowAddToBookListModal}
      {thisBook}
    />
    <BookDetail bind:shouldShow={shouldShowDetail} {thisBook} />
  </comment>
</div>
