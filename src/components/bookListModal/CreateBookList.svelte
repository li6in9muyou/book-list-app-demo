<script lang="ts">
  import { getContext } from "svelte";
  import { BookList_create } from "../../lib/backendService/BookList.service";
  import { getNotificationsContext } from "svelte-notifications";
  import { getNotify } from "../../lib/utility.js";
  import { field } from "svelte-forms";
  import { max, min, not, pattern, required } from "svelte-forms/validators";
  import { find, isEmpty, join, sampleSize } from "lodash";
  import PleaseCorrectMe from "../../lib/uiComponent/PleaseCorrectMe.svelte";

  export let max_length = 20;
  export let min_length = 4;
  let new_bookList_title = "";
  const thisBook = getContext<number>("thisBook");
  const pleaseCloseModal = getContext("pleaseCloseModal");
  let shouldShow = false;

  const newListName = field(
    "newListName",
    "",
    [required(), not(pattern(/ /)), min(min_length), max(max_length)],
    {
      stopAtFirstError: true,
      checkOnInit: true,
    }
  );

  function handleRandomizeName() {
    const lorem = "甲乙丙丁戊己庚辛壬癸子丑寅卯辰巳午未申酉戌亥".split("");
    $newListName.value = "未命名-" + join(sampleSize(lorem, 6), "");
  }
  handleRandomizeName();

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
    <span>新建书单</span>
  </div>
  <div class="collapse-content">
    <div class="form-control w-full">
      <label class="label py-0 pl-0" on:click={handleRandomizeName}>
        <span class="btn btn-ghost btn-sm label-text w-fit px-1 font-normal">
          名称，点击随机生成
        </span>
        <span
          class="label-text"
          class:text-error={$newListName.value.length > max_length}
          class:text-success={$newListName.value.length <= max_length}
          >{$newListName.value.length}/{max_length}</span
        >
      </label>
      <input
        bind:value={$newListName.value}
        class="input input-bordered input-secondary input-sm"
        placeholder="书单的名称"
        type="text"
      />
      <label class="label">
        <PleaseCorrectMe
          prompt="名字不可以包含空格"
          shouldShow={$newListName.errors.indexOf("pattern") !== -1}
        />
        <PleaseCorrectMe
          prompt="一定要填写书单名字"
          shouldShow={find($newListName.errors, (err) => {
            return err === "required";
          })}
        />
        <PleaseCorrectMe
          prompt={`书单名字至少${min_length}个字至多${max_length}个字`}
          shouldShow={find($newListName.errors, (err) => {
            return err === "min" || err === "max";
          })}
        />
        <button
          class="btn btn-accent btn-sm ml-auto mt-2"
          class:btn-disabled={!isEmpty($newListName.errors)}
          on:click={() => {
            BookList_create(new_bookList_title, [thisBook]);
            success("成功加入书单");
            pleaseCloseModal();
          }}
        >
          创建
        </button>
      </label>
    </div>
  </div>
</div>
