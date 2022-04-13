<script lang="ts">
  import PouchDB from "pouchdb";
  import { last, random, remove, toInteger } from "lodash";
  import { getNotify } from "../lib/utility.js";
  import { getNotificationsContext } from "svelte-notifications";
  import AddToActiveBucket from "../lib/uiComponent/AddToActiveBookList.svelte";

  const { info, error, success, notify } = getNotify(
    getNotificationsContext().addNotification
  );

  const db = new PouchDB("dbBookLists");

  let listName = random(5000, 5500).toString() + "-untitled";
  let createdBy = 1000;
  const listingBooks = [];
  for (let i = 0; i < 15; i++) {
    listingBooks.push(random(1000, 1800, false));
  }
  const genId = (user, list) => `${user} ${list}`;
  const getList = (id) => last(id.split(" "));
  const handleBookChange = (ev) => {
    let { bookId: subject, expected: shouldInList } = ev.detail;
    subject = toInteger(subject);
    db.get(genId(createdBy, listName))
      .then((doc) => {
        if (shouldInList) {
          doc.books.push(subject);
        } else {
          remove(doc.books, (b) => b === subject);
        }

        db.put({
          books: doc.books,

          _id: doc._id,
          _rev: doc._rev,
          createdBy,
        }).then(() => {
          notify(shouldInList ? "添加成功" : "移出成功");
        });
      })
      .catch((err) => {
        const { docId, message, name } = err;
        console.log(err);
        error([docId, name, message].join(" "));
      });
  };
  const handleDeleteBookList = async () => {
    const id = genId(createdBy, listName);
    db.get(id)
      .then((doc) => {
        doc._deleted = true;
        db.put(doc).then((r) => {
          notify("成功删除");
        });
      })
      .catch((err) => {
        console.error("error when deleting", id, err);
      });
  };

  const handleCreateBookList = async () => {
    const id = genId(createdBy, listName);
    try {
      await db.get(id);
      info(`"${getList(id)}"是已经存在的`);
    } catch (e) {
      db.put({
        books: [],

        _id: id,
        createdBy,
      }).then(() => notify(`成功创建：${listName}`));
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
