<script lang="ts">
  import PouchDB from "pouchdb";
  import { last, random, remove, toInteger } from "lodash";
  import { getNotify } from "../lib/utility.js";
  import { getNotificationsContext } from "svelte-notifications";

  const { error, success } = getNotify(
    getNotificationsContext().addNotification
  );

  const db = new PouchDB("dbBookLists");

  let listName = random(5000, 5500).toString() + "-untitled";
  let createdBy = 1000;
  const books = [];
  for (let i = 0; i < 15; i++) {
    books.push(random(1000, 1800, false));
  }

  let toDelete = last(books);
  const handleCreateBookList = () => {
    console.log("created: ", listName);
    db.put({
      _id: listName,
      books,
      createdBy,
    }).catch((err) => {
      console.log(err);
      error(err.message);
    });
  };
  const handleDeleteBookFromList = async () => {
    try {
      const doc = await db.get(listName);
      remove(doc.books, (b) => b === toInteger(toDelete));
      if ((await db.put(doc)).ok) {
        success("成功");
      }
    } catch (e) {
      error(e.message);
    }
  };
</script>

<div class="flex flex-col gap-4 p-4">
  <div class="input-group">
    <span>我是</span>
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
      placeholder="书id"
      class="input input-bordered"
      bind:value={toDelete}
    />
    <button class="btn btn-square" on:click={handleDeleteBookFromList}>
      删除
    </button>
  </div>
  <div class="input-group">
    <input
      type="text"
      placeholder="书单名字"
      class="input input-bordered"
      bind:value={listName}
    />
    <button class="btn btn-square" on:click={handleCreateBookList}>
      添加
    </button>
  </div>

  <div class="flex flex-wrap gap-4">
    {#each books as book}
      <div class="badge badge-primary badge-outline font-mono">{book}</div>
    {/each}
  </div>
</div>
