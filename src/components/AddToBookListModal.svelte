<script>
  import CreateBookList from "./CreateBookList.svelte";
  import ListUserBookLists from "./ListUserBookLists.svelte";
  import MdClose from "svelte-icons/md/MdClose.svelte";
  import { setContext } from "svelte";

  export let shouldShow = false;
  setContext("pleaseCloseModal", () => (shouldShow = false));
</script>

{#if shouldShow}
  <div class="modal modal-open">
    <div class="modal-box relative max-w-sm">
      <label
        class="btn btn-xs btn-circle btn-accent absolute right-2 top-2"
        on:click={() => (shouldShow = false)}
      >
        <span class="w-6 h-6">
          <MdClose />
        </span>
      </label>
      <h3 class="text-lg font-bold">添加到书单……</h3>
      <div class="divider" />
      <ListUserBookLists />
      <div class="divider" />
      <CreateBookList />
    </div>
  </div>
{/if}
