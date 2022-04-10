<script lang="ts">
  import { fetchBookListsByUserId } from "../../lib/backendService/BookList.service.ts";
  import BookListCheckBox from "../../lib/uiComponent/BookListCheckBox.svelte";
  import PleaseWait from "../../lib/uiComponent/PleaseWait.svelte";
  import { CurrentUserInfo } from "../../lib/backendService/user.service";
</script>

<div class="overflow-y-auto">
  {#await fetchBookListsByUserId($CurrentUserInfo.id)}
    <PleaseWait msg="书单加载中" />
  {:then bookLists}
    {#each bookLists as thisList}
      <BookListCheckBox {thisList} />
    {/each}
  {:catch error}
    <p>加载失败，因为{error}</p>
  {/await}
</div>
