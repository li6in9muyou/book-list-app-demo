<script lang="ts">
  import { scale } from "svelte/transition";
  import FaTrashAlt from "svelte-icons/fa/FaTrashAlt.svelte";
  import EmbeddedAlert from "../../lib/uiComponent/EmbeddedAlert.svelte";
  import { isEmpty } from "lodash";
  import { getContext } from "svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  const books = getContext("Selected");
</script>

<div
  class="max-h-72 w-full max-w-xs overflow-auto rounded rounded border bg-base-200 py-2 shadow-lg"
>
  {#if isEmpty($books)}
    <div class="w-60 p-4">
      <EmbeddedAlert color="info" text="购物车中还没有书" />
    </div>
  {:else}
    <div class="px-4 flex flex-col gap-y-4 max-w-full items-stretch">
      {#each $books as book}
        <div
          class="flex border-b border-b-neutral px-2 justify-between items-center"
          transition:scale
        >
          <span class="truncate italic">{book.title}</span>
          <label tabindex="0" class="btn btn-ghost btn-square btn-sm">
            <span
              class="h-4 w-4 text-warning"
              on:click={() => {
                dispatch("unselect", { book });
              }}
            >
              <FaTrashAlt />
            </span>
          </label>
        </div>
      {/each}
    </div>
  {/if}
</div>
