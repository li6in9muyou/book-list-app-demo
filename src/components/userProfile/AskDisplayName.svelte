<script>
  import PleaseCorrectMe from "../../lib/uiComponent/PleaseCorrectMe.svelte";
  import { required } from "svelte-forms/validators";
  import { field } from "svelte-forms";

  let s = field("displayName", " ", [required()], {
    checkOnInit: true,
    stopAtFirstError: true,
  });
  export let displayName = s;
</script>

<div class="form-control w-full">
  <label class="label">
    <span class="label-text text-lg">网名</span>
  </label>
  <input
    bind:value={$s.value}
    type="text"
    placeholder="此处输入网名"
    class="input input-bordered w-full"
  />
  <label class="label">
    <PleaseCorrectMe
      prompt="一定要填写网名"
      shouldShow={$s.errors.indexOf("required") !== -1}
    />
  </label>
</div>
