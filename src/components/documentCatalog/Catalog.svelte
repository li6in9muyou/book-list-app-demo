<script lang="ts">
  import DocumentCard from "../../lib/uiComponent/DocumentCard.svelte";
  import VirtualScroll from "@sveltejs/svelte-virtual-list";
  import { derived, writable } from "svelte/store";
  import PouchDB from "pouchdb";
  import { CurrentUserId } from "../../lib/backendService/user.service.js";
  import { concat, last, map, partition } from "lodash";
  import { Book } from "../Book/services";
  import AddToBookListModal from "../bookListModal/AddToBookListModal.svelte";

  export let books_to_show: Book[] = [];

  const thisGroup = writable(new Set<number>());
  const groupSize = derived(thisGroup, (g) => g.size);

  $: {
    books_to_show = concat(
      ...partition(books_to_show, (b) => $thisGroup.has(b.id))
    );
  }

  const db = new PouchDB("dbBookLists");

  async function bookList() {
    let lists = [];
    try {
      lists = (
        await db.allDocs({
          include_docs: false,
          startkey: $CurrentUserId.toString(),
          endkey: $CurrentUserId.toString() + `\ufff0`,
        })
      ).rows;
    } catch (e) {
      console.error("db.allDocs", e);
    }
    lists = map(lists, (list) => {
      return last(list.id.split(" "));
    });
    return lists;
  }

  function handleSelectAll() {
    for (const book of books_to_show) {
      $thisGroup.add(book.id);
    }
    $thisGroup = $thisGroup;
    console.log("all", $thisGroup);
  }

  function handleReverseSelection() {
    $thisGroup = new Set(
      books_to_show
        .filter((e) => {
          return !$thisGroup.has(e.id);
        })
        .map((book) => book.id)
    );
    console.log("reverse", $thisGroup);
  }

  function handleEmpty() {
    $thisGroup = new Set();
    console.log("empty", $thisGroup);
  }

  function onDocChange({ detail }) {
    const { id, expected } = detail;
    if (expected) {
      $thisGroup = $thisGroup.add(id);
    } else {
      $thisGroup.delete(id);
      $thisGroup = $thisGroup;
    }
    console.log("onToggle", $thisGroup);
  }

  let trackingList = "";
  let batchOp = false;
  let shouldShowBatchAdd = false;
  const handleBatchAdd = () => {
    shouldShowBatchAdd = true;
  };
</script>

{#if shouldShowBatchAdd}
  <AddToBookListModal
    bind:shouldShow={shouldShowBatchAdd}
    thisGroup={Array(...$thisGroup)}
  />
{/if}

<div class="flex h-px min-h-full flex-col px-4">
  <div class="flex items-center gap-2">
    <span class="btn btn-ghost btn-sm font-mono">
      选中了{$groupSize}项
    </span>
    <div class="dropdown" class:dropdown-open={batchOp}>
      <div
        class="btn btn-outline btn-sm m-0"
        on:click={() => {
          batchOp = !batchOp;
        }}
      >
        批量操作
      </div>
      <ul
        class="dropdown-content top-full z-40 my-2 flex w-fit flex-col justify-between gap-4 rounded border bg-base-100 p-2"
      >
        <li>
          <span
            class="btn btn-outline btn-success btn-sm"
            on:click={() => {
              handleSelectAll();
              batchOp = false;
            }}
          >
            全选
          </span>
        </li>
        <li>
          <span
            class="btn btn-outline btn-warning btn-sm"
            on:click={() => {
              handleReverseSelection();
              batchOp = false;
            }}
          >
            反选
          </span>
        </li>
        <li>
          <span
            class="btn btn-outline btn-error btn-sm"
            on:click={() => {
              handleEmpty();
              batchOp = false;
            }}
          >
            清空
          </span>
        </li>
      </ul>
    </div>
    <span class="ml-auto">
      <span class="btn" on:click={handleBatchAdd}>批量加入</span>
    </span>
    <span class="ml-auto">
      <select
        class="select select-bordered select-sm w-full max-w-xs"
        bind:value={trackingList}
      >
        <option disabled selected>追踪书单：</option>
        {#await bookList() then lists}
          {#each lists as list}
            <option>{list}</option>
          {/each}
        {/await}
      </select>
    </span>
  </div>
  <div class="h-px flex-1">
    <VirtualScroll items={books_to_show} let:item>
      <DocumentCard book={item} on:toggleSelection={onDocChange} {thisGroup} />
    </VirtualScroll>
  </div>
</div>
