<script lang="ts">
  import PouchDB from "pouchdb";
  import PouchDBFind from "pouchdb-find";
  import {
    addListener,
    borrowBook,
    listBorrow,
  } from "../lib/backendService/borrow.service";
  import { random } from "lodash";
  import { returnBook } from "../lib/backendService/borrow.service.js";
  import { onDestroy } from "svelte";

  PouchDB.plugin(PouchDBFind);

  let user = 1000;
  let book = random(0, 1800, false);
  let toReturn = book;

  let list = [];
  listBorrow(user).then((ans) => (list = ans));
  const handle = addListener((borrow) => {
    console.log("client", borrow);
    list = [...list, borrow];
  });
  onDestroy(() =>
    handle.then((h) => {
      console.log("pouchdb changes listener canceled");
      return h.cancel();
    })
  );
</script>

<div class="flex flex-col gap-4 p-4">
  <div class="input-group">
    <span class="text-xl"> 我是 </span>
    <input
      type="number"
      placeholder="userId"
      bind:value={user}
      class="input input-bordered w-1/3 font-mono text-2xl"
    />
  </div>
  <div class="input-group">
    <button
      class="btn btn-primary text-xl md:flex-none"
      on:click={() => {
        borrowBook(user, book);
        book = book + 1;
      }}
    >
      借出
    </button>
    <input
      type="number"
      placeholder="bookId"
      bind:value={book}
      class="input input-bordered w-1/3 font-mono text-2xl"
    />
  </div>

  <div class="input-group">
    <button
      class="btn btn-secondary text-xl md:flex-none"
      on:click={() => {
        returnBook(user, toReturn);
      }}
    >
      还回
    </button>
    <input
      type="number"
      placeholder="toReturn"
      bind:value={toReturn}
      class="input input-bordered w-1/3 font-mono text-2xl"
    />
  </div>
  <ul>
    {#each list as { userId, bookId, borrowedAt, returnedAt }}
      <li class="font-mono">{userId}, {bookId}, {borrowedAt}, {returnedAt}</li>
    {/each}
  </ul>
</div>
