<script lang="ts">
  import AskConsentConfirm from "../AskConsentConfirm.svelte";
  import MdMoreVert from "svelte-icons/md/MdMoreVert.svelte";
  import Rename from "../Rename.svelte";
  import { createEventDispatcher, setContext } from "svelte";

  const dispatch = createEventDispatcher();

  export { title };
  let title = "书单标题示例";
  setContext("book_list_name", title);

  const remove = async (e) => {
    dispatch("remove", { book_list_title: title });
  };
</script>

<div
  class="flex items-center justify-between rounded rounded-lg rounded-br-none rounded-bl-none bg-secondary p-2 text-secondary-content shadow"
>
  <span class="ml-4 font-mono text-xl font-bold">{title}</span>
  <div class="dropdown dropdown-end">
    <label tabindex="0" class="btn btn-ghost btn-square btn-sm border p-0">
      <span class="h-4 w-4"><MdMoreVert /></span>
    </label>
    <ul
      tabindex="0"
      class="dropdown-content menu rounded-box w-52 bg-base-100 p-2 text-base-content shadow"
    >
      <div>
        <Rename on:rename />
      </div>
      <div class="justify-items-center">
        <AskConsentConfirm prompt="删除此书单" on:dangerOp|once={remove} />
      </div>
    </ul>
  </div>
</div>
