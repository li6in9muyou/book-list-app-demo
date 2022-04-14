<script>
  import { textSearch } from "../../lib/searchEengine.ts";
  import { identity } from "lodash";

  export let hay = [];
  export let results;
  export let error;
  export let getKey = identity;
  let query = "";

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

<div class="grid items-center items-stretch gap-1 sm:flex">
  <input
    autocapitalize="off"
    autocomplete="off"
    bind:value={query}
    class="input input-bordered input-secondary font-mono text-lg shadow
                  sm:flex-1
                  md:text-xl"
    placeholder="搜索……"
    spellcheck="false"
    type="text"
  />
  <div class="flex gap-1">
    <label
      class="label flex-1 cursor-pointer rounded border px-4 shadow
                  sm:gap-2"
    >
      <span class="label-text">用正则表达</span>
      <input
        bind:checked={useRegex}
        class="toggle toggle-primary"
        type="checkbox"
      />
    </label>
    <label
      class="label flex-1 cursor-pointer rounded border px-4 shadow
                  sm:gap-2"
    >
      <span class="label-text">忽略大小写</span>
      <input
        bind:checked={ignoreCase}
        class="toggle toggle-primary"
        type="checkbox"
      />
    </label>
  </div>
</div>
