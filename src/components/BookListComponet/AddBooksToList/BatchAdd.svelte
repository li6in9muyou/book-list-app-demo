<script lang="ts">
  import CreateBookList from "./CreateBookList.svelte";
  import ListUserBookLists from "./ListUserBookLists.svelte";
  import MdClose from "svelte-icons/md/MdClose.svelte";
  import { setContext } from "svelte";
  import PleaseProvideAuth from "../../userProfile/PleaseProvideAuth.svelte";

  export let shouldShow = false;
  export let thisBook: number;
  export let thisGroup: number[];

  if (thisBook === undefined) {
    console.error("AddToBookListModal was created without an attached bookId");
    console.debug("attach one with: setContext('thisBook', <number>)");
    console.debug("defaults to -1");
    thisBook = -1;
  }

  setContext<() => void>("pleaseCloseModal", () => (shouldShow = false));
  setContext<number>("thisBook", thisBook);
  console.log(thisGroup);
  setContext<number[]>("thisGroup", thisGroup);
</script>

{#if shouldShow}
  <PleaseProvideAuth>
    <div class="modal modal-open">
      <div class="modal-box relative max-w-sm">
        <label
          class="btn btn-accent btn-circle btn-xs absolute right-2 top-2"
          on:click={() => (shouldShow = false)}
        >
          <span class="h-6 w-6">
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
  </PleaseProvideAuth>
{/if}
