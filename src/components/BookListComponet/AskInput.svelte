<script lang="ts">
  import PleaseCorrectMe from "../../lib/uiComponent/PleaseCorrectMe.svelte";
  import { isEmpty } from "lodash";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let prompt = "请输入信息";
  export let place_holder = "输入……";
  export let value = "";
  export let errors: string[] = [];

  let pending = false;
</script>

<div class="form-control w-full">
  <div class="mb-2 flex select-none items-center justify-between px-2">
    <span class="w-fit font-normal">
      {prompt}
    </span>
    <button
      class="btn btn-accent btn-sm ml-auto"
      class:btn-disabled={!isEmpty(errors) || pending}
      on:click={() => {
        dispatch("done", { value: value });
        pending = true;
        setTimeout(() => (pending = false), 5000);
      }}
    >
      确定
    </button>
  </div>
  <input
    bind:value
    class="input input-bordered input-secondary input-sm bg-base-100"
    placeholder={place_holder}
    type="text"
  />
  <label class="label">
    {#each errors as error}
      <PleaseCorrectMe prompt={error} shouldShow={true} />
    {/each}
  </label>
</div>
