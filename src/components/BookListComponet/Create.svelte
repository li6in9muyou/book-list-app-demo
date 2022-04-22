<script lang="ts">
  import { debounce } from "lodash";
  import { createBookList } from "../../lib/backendService/BookList.service";
  import { CurrentUserId } from "../../lib/backendService/user.service";
  import RejectBadName from "./RejectBadName.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let init_books = [];

  let done = debounce(
    async ({ detail }) => {
      console.log(detail);
      const m = await createBookList(
        $CurrentUserId,
        detail.value,
        init_books.map((b) => b.id)
      );
      console.log(m);
      dispatch("created");
    },
    3000,
    { leading: true }
  );
</script>

<RejectBadName prompt="新建书单" on:done={done} place_holder="书单名称" />
