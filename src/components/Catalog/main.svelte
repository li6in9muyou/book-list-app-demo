<script lang="ts">
  import { setContext } from "svelte";
  import Listing from "./Listing.svelte";
  import { derived, writable } from "svelte/store";
  import Filter from "./Filter.svelte";
  import { pull } from "lodash";
  import BatchOp from "./BatchOp.svelte";

  let all_entries = writable(new Array(50).fill(0).map((_, i) => i + 1));

  let filter = writable((x) => {
    return true;
  });

  let showing = derived([all_entries, filter], ([items, fn]) =>
    items.filter(fn)
  );

  let selected = writable([]);

  setContext("AllEntries", all_entries);
  setContext("Showing", showing);
  setContext("Filter", filter);
  setContext("Selected", selected);

  setContext("BatchOperation", {
    all() {
      $selected = $showing;
    },
    reverse() {
      $selected = $showing.filter((i) => $selected.indexOf(i) === -1);
    },
    clear() {
      $selected = [];
    },
  });

  setContext("toggle", (x, expected) => {
    if (expected) {
      $selected = [...$selected, x];
    } else {
      $selected = pull($selected, x);
    }
  });
  setContext("queryToggle", (x) => {
    console.log("qToggle");
    return $selected.indexOf(x) !== -1;
  });
</script>

<div class="flex flex-col gap-y-4 p-4">
  <div>
    <BatchOp />
    <label class="label justify-start gap-4">
      <span>factor</span>
      <Filter />
    </label>
  </div>
  <div class="h1">filtered:</div>
  <Listing entries={showing} />
  <div class="divider divider-vertical" />
  <div class="h1">selected:</div>
  <Listing entries={selected} />
</div>
