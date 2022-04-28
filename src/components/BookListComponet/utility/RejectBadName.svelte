<script lang="ts">
  import AskInput from "./AskInput.svelte";
  import { field } from "svelte-forms";
  import { max, min, not, pattern, required } from "svelte-forms/validators";
  import { map } from "lodash";

  export let prompt, place_holder, value;

  const min_len = 4;
  const max_len = 20;
  let book_list_name = field(
    "book_list_name",
    value === undefined ? "" : value,
    [required(), not(pattern(/ /)), min(min_len), max(max_len)],
    { valid: false, checkOnInit: true, stopAtFirstError: true }
  );
  const error_tips = {
    required: "一定要填写书单名字",
    pattern: "名字不可以包含空格",
    min: `书单名字至少${min_len}个字至多${max_len}个字`,
    max: `书单名字至少${min_len}个字至多${max_len}个字`,
  };
</script>

<AskInput
  {prompt}
  {place_holder}
  bind:value={$book_list_name.value}
  errors={map($book_list_name.errors, (k) => error_tips[k])}
  on:done
/>
