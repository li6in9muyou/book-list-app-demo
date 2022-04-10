<script lang="ts">
  import { fetchAllBookListOfUser } from "../lib/backendService/BookList.service";
  import { get } from "lodash/object.js";
  import AddToBookListModal from "../components/bookListModal/AddToBookListModal.svelte";

  let shouldShow = true;
</script>

<AddToBookListModal bind:shouldShow />
<div class="p-4">
  <label class="btn btn-ghost mb-4 text-xl text-secondary">
    书单列表
    <input bind:checked={shouldShow} class="hidden" type="checkbox" />
  </label>
  {#await fetchAllBookListOfUser("li6q") then bookLists}
    <div class="flex flex-col gap-4">
      <table class="table w-full">
        <thead>
          <tr>
            <th>书单名称</th>
            <th>创建者</th>
          </tr>
        </thead>
        <tbody>
          {#each bookLists as bookList}
            <tr>
              {#if bookList.title === undefined}
                <td>
                  <em>未命名</em>
                </td>
              {:else}
                <td>"{bookList.title}"</td>
              {/if}
              <td>{bookList.userId}</td>
            </tr>
            <tr>
              <td colspan="2" class="border-b border-b-2 border-b-accent">
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
  {/await}
</div>
