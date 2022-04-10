<script lang="ts">
  import { fetchAllBookListOfUser } from "../lib/backendService/BookList.service";
  import { get } from "lodash/object.js";
  import AddToBookListModal from "../components/bookListModal/AddToBookListModal.svelte";
  import { CurrentUser } from "../lib/backendService/user.service";
  import EmbeddedAlert from "../lib/uiComponent/EmbeddedAlert.svelte";

  let shouldShow = false;
  let thisBook = 1111;
</script>

<AddToBookListModal bind:shouldShow {thisBook} />
<div class="p-4">
  <input
    type="number"
    class="input-outline input w-1/2 border font-mono text-xl shadow"
    bind:value={thisBook}
  />
  <label class="btn btn-ghost mb-4 text-xl text-secondary">
    加入书单
    <input bind:checked={shouldShow} class="hidden" type="checkbox" />
  </label>
  {#await fetchAllBookListOfUser($CurrentUser) then bookLists}
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
