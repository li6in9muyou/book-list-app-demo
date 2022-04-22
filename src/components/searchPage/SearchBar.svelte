<script>
  import { textSearch } from "../../lib/searchEengine.ts";
  import FaCog from "svelte-icons/fa/FaCog.svelte";
  import { identity } from "lodash";

  export let hay = [];
  export let results;
  export let error;
  export let getKey = identity;
  let query = "aa";

  let success;
  let showing_count;
  let ignoreCase = true;
  let useRegex = true;

  $: {
    ({ results, success, error } = textSearch(query, hay, getKey, {
      useRegex: useRegex,
      ignoreCase: ignoreCase,
    }));
  }
  $: showing_count = results.length;
</script>

<div class="flex">
  <div class="dropdown">
    <label tabindex="0" class="btn btn-outline btn-sm rounded-r-none">
      <span class="h-4 w-4 text-accent"><FaCog /></span>
    </label>
    <ul
      tabindex="0"
      class="dropdown-content top-full z-40 my-2 flex w-52 flex-col gap-2 rounded rounded-lg bg-base-100 p-2"
    >
      <li>
        <label class="label cursor-pointer rounded border px-4 shadow sm:gap-2">
          <span class="label-text">用正则表达</span>
          <input
            bind:checked={useRegex}
            class="toggle toggle-primary"
            type="checkbox"
          />
        </label>
      </li>
      <li>
        <label class="label cursor-pointer rounded border px-4 shadow sm:gap-2">
          <span class="label-text">忽略大小写</span>
          <input
            bind:checked={ignoreCase}
            class="toggle toggle-primary"
            type="checkbox"
          />
        </label>
      </li>
    </ul>
  </div>
  <input
    autocapitalize="off"
    autocomplete="off"
    bind:value={query}
    class="input input-bordered input-secondary input-sm w-full rounded-l-none font-mono text-lg shadow md:text-xl"
    placeholder="搜索……"
    spellcheck="false"
    type="text"
  />
</div>
