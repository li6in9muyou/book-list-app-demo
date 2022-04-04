<script>
  import { textSearch } from "../../lib/searchEengine.js";
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

<div
  class="grid gap-4 items-center items-stretch
            sm:flex"
>
  <input
    autocapitalize="off"
    autocomplete="off"
    bind:value={query}
    class="font-mono input input-secondary input-bordered shadow
                  md:text-xl
                  sm:flex-1
                  md:flex-1 md:w-1/3
                  max-w-lg"
    placeholder="搜索……"
    spellcheck="false"
    type="text"
  />
  <label
    class="label cursor-pointer border rounded shadow
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
    class="label cursor-pointer border rounded shadow
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
