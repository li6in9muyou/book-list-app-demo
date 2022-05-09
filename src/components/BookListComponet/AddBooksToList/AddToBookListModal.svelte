<script lang="ts">
  import Create from "../Create.svelte";
  import MdClose from "svelte-icons/md/MdClose.svelte";
  import PleaseProvideAuth from "../../userProfile/PleaseProvideAuth.svelte";
  import { fetchBookListsByUserId } from "../services.js";
  import PleaseWait from "../../../lib/uiComponent/PleaseWait.svelte";
  import { isEmpty } from "lodash";
  import EmbeddedAlert from "../../../lib/uiComponent/EmbeddedAlert.svelte";
  import ToggleBooks from "../ToggleBooks.svelte";
  import { CurrentUserId } from "../../userProfile/stores";

  export let shouldShow = false;
  export let thisBooks: number[];

  const close = () => (shouldShow = false);
</script>

{#if shouldShow}
  <div class="modal modal-open">
    <div class="modal-box relative max-w-sm">
      <label
        class="btn btn-circle btn-accent btn-xs absolute right-2 top-2"
        on:click={() => (shouldShow = false)}
      >
        <span class="h-6 w-6">
          <MdClose />
        </span>
      </label>
      <PleaseProvideAuth>
        <h3 class="text-lg font-bold">添加到书单……</h3>
        <div class="divider" />
        <div class="overflow-y-auto">
          {#await fetchBookListsByUserId($CurrentUserId)}
            <PleaseWait msg="书单加载中" />
          {:then bookLists}
            {#if isEmpty(bookLists)}
              <EmbeddedAlert text="您还没有书单" />
            {:else}
              {#each bookLists as thisBookList}
                <ToggleBooks
                  {thisBookList}
                  {thisBooks}
                  on:pleaseCloseModal={close}
                />
              {/each}
            {/if}
          {:catch error}
            <p>加载失败，因为{error}</p>
          {/await}
        </div>
        <div class="divider" />
        <Create on:pleaseCloseModal={close} init_books={thisBooks} />
      </PleaseProvideAuth>
    </div>
  </div>
{/if}
