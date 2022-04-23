<script lang="ts">
  import FaTrashAlt from "svelte-icons/fa/FaTrashAlt.svelte";
  import VirtualScroll from "@sveltejs/svelte-virtual-list";
  import EmbeddedAlert from "../../lib/uiComponent/EmbeddedAlert.svelte";
  import { isEmpty } from "lodash";
  import { createEventDispatcher, getContext } from "svelte";

  const dispatch = createEventDispatcher();

  const books = getContext("Selected");
</script>

<div
  class="h-72 w-full max-w-xs overflow-auto rounded rounded-lg border bg-base-200 p-2 shadow-lg md:h-96 md:max-w-lg"
>
  {#if isEmpty($books)}
    <div class="w-60 p-4">
      <EmbeddedAlert color="info" text="购物车中还没有书" />
    </div>
  {:else}
    <VirtualScroll items={$books} let:item>
      <div
        class="flex border-b border-b-neutral px-2 justify-between items-center"
      >
        <span class="truncate italic">{item.title}</span>
        <label tabindex="0" class="btn btn-ghost btn-square btn-sm">
          <span
            class="h-4 w-4 text-warning"
            on:click={() => {
              dispatch("unselect", { item });
            }}
          >
            <FaTrashAlt />
          </span>
        </label>
      </div>
    </VirtualScroll>
  {/if}
</div>
