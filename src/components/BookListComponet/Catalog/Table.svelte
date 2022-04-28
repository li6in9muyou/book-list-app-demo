<script lang="ts">
  import MdExpandMore from "svelte-icons/md/MdExpandMore.svelte";
  import EmbeddedAlert from "../../../lib/uiComponent/EmbeddedAlert.svelte";
  import { isEmpty } from "lodash";
  import { Book } from "../../../lib/backendService/book.service";
  import AskConsentConfirm from "../utility/AskConsentConfirm.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let books: Book[] = [];
  const done = (id) => {
    dispatch("remove", { book_id: id });
  };
</script>

<div
  class="flex max-w-full flex-col gap-y-4 rounded-b-lg border-2 border-secondary px-4 pb-4"
>
  {#if isEmpty(books)}
    <div class="p-4">
      <EmbeddedAlert text="此书单中还没有书" />
    </div>
  {:else}
    {#each books as book}
      <div
        class="flex border-b border-b-neutral px-2 justify-between items-center"
      >
        <span class="truncate w-3/4">{book.title}</span>
        <div class="dropdown-end dropdown">
          <label tabindex="0" class="btn btn-ghost btn-square btn-sm">
            <span class="h-4 w-4"><MdExpandMore /></span>
          </label>
          <ul
            tabindex="0"
            class="dropdown-content menu w-52 bg-base-100 p-2 shadow"
          >
            <div class="justify-items-center">
              <AskConsentConfirm
                prompt="从书单中删除"
                on:dangerOp={() => done(book.id)}
              />
            </div>
          </ul>
        </div>
      </div>
    {/each}
  {/if}
</div>
