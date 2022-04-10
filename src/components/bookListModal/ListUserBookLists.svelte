<script lang="ts">
  import { CurrentUser } from "../../lib/backendService/user.service";
  import { fetchAllBookListOfUser } from "../../lib/backendService/BookList.service.ts";
  import BookListCheckBox from "../../lib/uiComponent/BookListCheckBox.svelte";
  import PleaseWait from "../../lib/uiComponent/PleaseWait.svelte";
</script>

<div class="overflow-y-auto">
  {#await fetchAllBookListOfUser($CurrentUser)}
    <PleaseWait msg="书单加载中" />
  {:then bookLists}
    {#each bookLists as thisList}
      <BookListCheckBox {thisList} />
    {/each}
  {:catch error}
    <p>加载失败，因为{error}</p>
  {/await}
</div>
