<script lang="ts">
  import { fetchUserBookLists } from "../components/BookListComponet/BookList.service";
  import { get } from "lodash/object.js";
  import AddToBookListModal from "../components/BookListComponet/AddBooksToList/main.svelte";
  import EmbeddedAlert from "../lib/uiComponent/EmbeddedAlert.svelte";
  import { CurrentUserId } from "../components/userProfile/stores";

  let shouldShow = false;
  let thisBook = 1111;

  const resp = fetchUserBookLists($CurrentUserId);
</script>

<AddToBookListModal bind:shouldShow {thisBook} />
<div class="flex flex-col gap-4 p-4">
  <div class="input-group">
    <input
      type="number"
      class="input input-bordered w-1/4 font-mono text-2xl"
      bind:value={thisBook}
    />
    <button class="btn btn-primary flex-1 text-xl md:flex-none">
      <label>
        <input bind:checked={shouldShow} class="hidden" type="checkbox" />
        加入书单
      </label>
    </button>
  </div>
  {#await $resp then bookLists}
    <div class="flex flex-col gap-4">
      <table class="table w-full table-fixed">
        <thead>
          <tr>
            <th colspan="2">书单名称</th>
            <th>创建者</th>
          </tr>
        </thead>
        <tbody>
          {#each bookLists as bookList}
            <tr>
              <td colspan="2" class="truncate">
                "{bookList.title || "未命名的书单-" + bookList.id}"
              </td>
              <td colspan="1">{bookList.userId}</td>
            </tr>
            <tr>
              <td colspan="3" class="border-b border-b-2 border-b-accent">
                <div class="flex items-center">
                  书
                  <div class="divider divider-horizontal" />
                  <div class="flex gap-4 flex-wrap">
                    {#each get(bookList, "books", []) as book}
                      <div class="badge badge-primary badge-outline font-mono">
                        {book}
                      </div>
                    {/each}
                  </div>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {:catch e}
    <EmbeddedAlert text={`出错了：${e}}`} />
  {/await}
</div>
