<script lang="ts">
  import { getContext } from "svelte";
  import FaCog from "svelte-icons/fa/FaCog.svelte";
  import { buildSearchFilter } from "../../lib/searchEengine.js";
  import { Book } from "../../lib/backendService/book.service.js";
  import { isEmpty } from "lodash";

  let query = "";
  let ignoreCase = true;
  let useRegex = true;

  const filter = getContext("Filter");
  const adapter = (predicate) => (book: Book) => {
    return predicate(book.title);
  };

  $: {
    const { predicate, errors } = buildSearchFilter(query, {
      ignoreCase,
      useRegex,
    });

    if (isEmpty(errors)) {
      filter.set(adapter(predicate));
    }
  }
</script>

<div class="flex">
  <input
    bind:value={query}
    autocapitalize="off"
    autocomplete="off"
    class="input input-bordered input-secondary input-sm w-full rounded-r-none border-r-0 font-mono text-lg shadow
           md:input-md md:text-xl"
    placeholder="搜索……"
    spellcheck="false"
    type="text"
  />
  <div class="dropdown-top dropdown dropdown-end">
    <label
      tabindex="0"
      class="btn btn-outline btn-secondary btn-square btn-sm rounded-l-none border-l-0 md:btn-md"
    >
      <span class="h-4 w-4"><FaCog /></span>
    </label>
    <ul
      tabindex="0"
      class="dropdown-content top-full z-40 my-2 flex w-52 flex-col gap-2 rounded rounded-lg bg-base-100 p-2"
    >
      <li>
        <label class="label cursor-pointer rounded border px-4 shadow sm:gap-2">
          <span class="label-text">用正则表达</span>
          <input bind:checked={useRegex} class="toggle" type="checkbox" />
        </label>
      </li>
      <li>
        <label class="label cursor-pointer rounded border px-4 shadow sm:gap-2">
          <span class="label-text">忽略大小写</span>
          <input bind:checked={ignoreCase} class="toggle" type="checkbox" />
        </label>
      </li>
    </ul>
  </div>
</div>
