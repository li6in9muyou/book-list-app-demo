<script lang="ts">
  import EmbeddedAlert from "../lib/uiComponent/EmbeddedAlert.svelte";
  import { fetchBookListsByUserId } from "../components/BookListComponet/services";
  import { get, isEmpty } from "lodash";
  import PleaseProvideAuth from "../components/userProfile/PleaseProvideAuth.svelte";
  import { CurrentUserId } from "../components/userProfile/stores";

  console.log(1);
</script>

<PleaseProvideAuth>
  <div class="p-4">
    <div class="mb-4 text-xl font-bold text-accent">我的书单</div>
    {#await fetchBookListsByUserId($CurrentUserId) then bookLists}
      <div class="flex flex-col gap-4">
        <table class="table w-full table-fixed">
          <thead>
            <tr>
              <th colspan="2">书单名称</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {#if isEmpty(bookLists)}
              <tr>
                <td colspan="3" class="p-2">
                  <EmbeddedAlert color="info" text="您还没有书单" />
                </td>
              </tr>
            {:else}
              {#each bookLists as bookList}
                <tr>
                  <td colspan="2" class="truncate">
                    "{bookList.title || "未命名的书单-" + bookList.id}"
                  </td>
                  <td colspan="1">
                    <div class="btn-group">
                      <div class="btn">分享</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="3" class="border-b border-b-2 border-b-accent">
                    <div class="flex items-center">
                      书
                      <div class="divider divider-horizontal" />
                      <div class="flex gap-4 flex-wrap">
                        {#each get(bookList, "books", []) as book}
                          <div
                            class="badge badge-primary badge-outline font-mono"
                          >
                            {book}
                          </div>
                        {/each}
                      </div>
                    </div>
                  </td>
                </tr>
              {/each}
            {/if}
          </tbody>
        </table>
      </div>
    {:catch e}
      <EmbeddedAlert text={`出错了：${e}`} />
    {/await}
  </div>
</PleaseProvideAuth>
