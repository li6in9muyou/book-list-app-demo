<script lang="ts">
  import { borrowBook, canBorrow } from "../services";
  import { getNotify } from "../../../lib/utility";
  import { getNotificationsContext } from "svelte-notifications";
  import { onMount } from "svelte";

  export let userId: number;
  export let bookId: number;

  const { error, success } = getNotify(getNotificationsContext());

  let can_borrow = true;
  onMount(async () => {
    can_borrow = await canBorrow(userId, bookId);
  });
</script>

<main class="flex items-center gap-4">
  <div class="indicator">
    <div
      class="badge indicator-item badge-error text-xs text-error-content"
      class:hidden={can_borrow}
    >
      不能借
    </div>
    <button
      class="btn btn-info btn-sm text-info-content"
      on:click={async () => {
        try {
          await borrowBook(userId, bookId);
        } catch (e) {
          error(`出现了${e.message}的错误，原因是：${e.cause}`);
          return;
        }
        success("借书成功了");
        can_borrow = false;
      }}
      class:btn-disabled={!can_borrow}
    >
      {#if !can_borrow}已经借过了{:else}借这本书{/if}
    </button>
  </div>
</main>
