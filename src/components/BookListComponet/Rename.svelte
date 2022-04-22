<script lang="ts">
  import RejectBadName from "./RejectBadName.svelte";
  import { debounce } from "lodash";
  import { createEventDispatcher, getContext } from "svelte";

  const dispatch = createEventDispatcher();

  const old_name = getContext("book_list_name");
  const done = debounce(
    async ({ detail }) => {
      dispatch("rename", { new_name: detail.value, old_name });
    },
    3000,
    { leading: true }
  );
</script>

<RejectBadName prompt="重命名书单" on:done={done} value={old_name} />
