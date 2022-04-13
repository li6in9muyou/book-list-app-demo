<script lang="ts">
  import DocumentCard from "../documentCatalog/DocumentCard.svelte";
  import VirtualScroll from "@sveltejs/svelte-virtual-list";
  import { derived, writable } from "svelte/store";
  import PouchDB from "pouchdb";
  import { CurrentUserId } from "../../lib/backendService/user.service.js";
  import { concat, last, map, partition } from "lodash";
  import { Book } from "../../lib/backendService/book.service";

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
</script>

{trackingList}
<div class="flex h-px min-h-full flex-col px-4">
  <span class="flex items-center">
    <span class="input-group w-fit px-1">
      <span
        class="btn btn-outline btn-success btn-sm"
        on:click={handleSelectAll}
      >
        全选
      </span>
      <span
        class="btn btn-outline btn-warning btn-sm"
        on:click={handleReverseSelection}
      >
        反选
      </span>
      <span class="btn btn-outline btn-error btn-sm" on:click={handleEmpty}>
        清空
      </span>
    </span>
    <span class="badge badge-sm badge-outline h-full font-mono">
      选中了{$groupSize}项
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
  </span>
  <div class="h-px flex-1">
    <VirtualScroll items={books_to_show} let:item>
      <DocumentCard book={item} on:toggleSelection={onDocChange} {thisGroup} />
    </VirtualScroll>
  </div>
</div>
