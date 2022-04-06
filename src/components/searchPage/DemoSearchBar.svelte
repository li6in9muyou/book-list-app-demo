<script>
  import SearchBar from "./SearchBar.svelte";
  import { get, map, range } from "lodash";

  let error = { detail: "" };
  let results;
  const hay = [
    "\\\\",
    ...map(range(10, 20), (num) => `风aaaaaaaaaaaaaaaaaaaaaa${num}`),
    ...map(range(20, 30), (num) => `林A.A.A${num}`),
    ...map(range(30, 40), (num) => `火A\\A\\A${num}`),
    ...map(range(50, 60), (num) => `山A\\A\\A${num}`),
  ];
</script>

<div class="mx-6 grid gap-y-4 py-6">
  <div class="md:grid md:grid-cols-5">
    <div class="md:col-span-4">
      <SearchBar {hay} bind:results bind:error />
    </div>
    <div class="md:flex-start md:col-span-1 md:col-start-5 md:flex">
      <div class="divider md:divider-horizontal md:col-auto md:m-0" />
      <div
        class="flex flex-1 gap-2
                        md:items-center md:items-stretch md:text-lg"
      >
        <div class="flex-1 rounded border border-info p-2 md:min-w-fit">
          数量：{get(results, "length", 0)}
        </div>
        <div
          class="flex-1 rounded border p-2"
          class:border-error={get(error, "detail", "") !== ""}
          class:border-success={get(error, "detail", "") === ""}
        >
          {get(error, "detail", "")}
        </div>
      </div>
    </div>
  </div>
  <ul
    class="grid grid-cols-3 justify-items-start gap-4 border-4 border-accent border-red-600
               py-4 px-2
               font-mono
               text-lg
               sm:grid-cols-5
               md:grid-cols-6"
  >
    {#each results ?? [] as result}
      <li class="break-all">{result}</li>
    {/each}
  </ul>
</div>
