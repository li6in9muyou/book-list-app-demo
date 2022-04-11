<script lang="ts">
  import { fetchBookListsByUserId } from "../../lib/backendService/BookList.service.ts";
  import BookListCheckBox from "../../lib/uiComponent/BookListCheckBox.svelte";
  import PleaseWait from "../../lib/uiComponent/PleaseWait.svelte";
  import { CurrentUserInfo } from "../../lib/backendService/user.service";
  import { isEmpty } from "lodash";
  import EmbeddedAlert from "../../lib/uiComponent/EmbeddedAlert.svelte";
</script>

<div class="overflow-y-auto">
  {#await fetchBookListsByUserId($CurrentUserInfo.id)}
    <PleaseWait msg="书单加载中" />
  {:then bookLists}
    {#if isEmpty(bookLists)}
      <EmbeddedAlert text="您还没有书单" />
    {:else}
      {#each bookLists as thisList}
        <BookListCheckBox {thisList} />
      {/each}
    {/if}
  {:catch error}
    <p>加载失败，因为{error}</p>
  {/await}
</div>
