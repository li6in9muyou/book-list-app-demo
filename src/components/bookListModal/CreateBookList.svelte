<script lang="ts">
  import { getContext } from "svelte";
  import { BookList_create } from "../../lib/backendService/BookList.service";
  import { getNotificationsContext } from "svelte-notifications";
  import { getNotify } from "../../lib/utility.js";

  export let max_length = 150;
  let new_bookList_title = "";
  const thisBook = getContext<number>("thisBook");
  const pleaseCloseModal = getContext("pleaseCloseModal");
  let shouldShow = false;

  const { success } = getNotify(getNotificationsContext().addNotification);
</script>

<div class="collapse" tabindex="0">
  <input bind:checked={shouldShow} type="checkbox" />
  <div class="collapse-title flex">
    <svg
      class="mr-2 inline h-6 w-6 fill-accent"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
    </svg>
    <span>新建播放列表</span>
  </div>
  <div class="collapse-content">
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">名称</span>
        <span class="label-text">{new_bookList_title.length}/{max_length}</span>
      </label>
      <input
        bind:value={new_bookList_title}
        class="input input-bordered input-secondary input-sm"
        placeholder="书单的名称"
        type="text"
      />
      <button
        class="btn btn-accent btn-sm ml-auto mt-2"
        on:click={() => {
          BookList_create(new_bookList_title, [thisBook]);
          success("成功加入书单");
          pleaseCloseModal();
        }}
        >创建
      </button>
    </div>
  </div>
</div>
