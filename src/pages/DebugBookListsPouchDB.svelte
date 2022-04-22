<script lang="ts">
  import PouchDB from "pouchdb";
  import { last, random, toInteger } from "lodash";
  import { getNotify } from "../lib/utility.js";
  import { getNotificationsContext } from "svelte-notifications";
  import AddToActiveBucket from "../lib/uiComponent/AddToActiveBookList.svelte";
  import {
    createBookList,
    deleteBookList,
    updateBooksBookList,
  } from "../lib/backendService/BookList.service";

  const { info, error, success, notify } = getNotify(getNotificationsContext());

  const db = new PouchDB("dbBookLists");

  let listName = random(5000, 5500).toString() + "-untitled";
  let createdBy = 1000;
  const listingBooks = [];
  for (let i = 0; i < 15; i++) {
    listingBooks.push(random(1000, 1800, false));
  }
  const genId = (user, list) => `${user} ${list}`;
  const getList = (id) => last(id.split(" "));
  const handleBookChange = async (ev) => {
    const { bookId, expected: shouldInList } = ev.detail;
    try {
      await updateBooksBookList(
        createdBy,
        listName,
        [toInteger(bookId)],
        shouldInList
      );
    } catch (e) {
      error("出错了：" + e.message);
      console.error(e);
    }
  };

  const handleDeleteBookList = async () => {
    try {
      await deleteBookList(createdBy, listName);
      info("成功删除");
    } catch (e) {
      error("出错了：" + e.message);
      console.error(e);
    }
  };

  const handleCreateBookList = async () => {
    try {
      await createBookList(createdBy, listName, []);
      success("成功创建");
    } catch (e) {
      error("出错了：" + e.message);
    }
  };
</script>

<div class="flex flex-col gap-4 p-4">
  <div class="input-group">
    <button class="btn btn-disabled btn-square text-base-content">我是</button>
    <input
      type="number"
      placeholder="用户id"
      class="input input-bordered"
      bind:value={createdBy}
    />
  </div>
  <div class="input-group">
    <input
      type="text"
      placeholder="书单名字"
      class="input input-bordered"
      bind:value={listName}
    />
    <button
      class="btn btn-error btn-square min-w-fit px-2"
      on:click={handleDeleteBookList}
    >
      删除
    </button>
    <button
      class="btn btn-square min-w-fit px-2"
      on:click={handleCreateBookList}
    >
      新增书单
    </button>
  </div>
  <div class="input-group">
    <button
      class="btn btn-disabled btn-square min-w-fit px-2 text-base-content"
    >
      使用中的书单
    </button>
    <input
      type="text"
      placeholder="书单名字"
      class="input input-bordered"
      bind:value={listName}
    />
  </div>
  <div class="flex flex-wrap gap-4">
    {#each listingBooks as book}
      <AddToActiveBucket bookId={book} on:bookChange={handleBookChange} />
    {/each}
  </div>
</div>
