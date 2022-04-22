<script lang="ts">
  import { fetchBooksById } from "../../components/Book/services.js";
  import { allBorrowedBooks } from "../../components/Lending/services.js";
  import { CurrentUserId } from "../../lib/backendService/user.service.js";
  import { isEmpty, map } from "lodash";
  import DocumentCard from "../../lib/uiComponent/DocumentCard.svelte";
  import Return from "../../components/Lending/Return/main.svelte";
  import EmbeddedAlert from "../../lib/uiComponent/EmbeddedAlert.svelte";

  const fetchBorrow = async () => {
    const borrowed = await allBorrowedBooks($CurrentUserId);
    return await fetchBooksById(map(borrowed, (h) => h.bookId));
  };
</script>

<div class="flex flex-col gap-2 p-4">
  {#await fetchBorrow() then user_borrow}
    {#if isEmpty(user_borrow)}
      <EmbeddedAlert color="info" text="您没有借书记录" />
    {:else}
      {#each user_borrow as book}
        <DocumentCard {book}>
          <Return userId={$CurrentUserId} bookId={book.id} />
        </DocumentCard>
      {/each}
    {/if}
  {/await}
</div>
