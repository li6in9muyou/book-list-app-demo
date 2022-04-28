<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export { prompt, prompt_go, prompt_cancel };

  let prompt = "危险操作";
  let prompt_go = "继续";
  let prompt_cancel = "取消";

  const dispatch = createEventDispatcher();

  let pre = true;
  let final = false;
  let finished = false;
</script>

{#if pre}
  <div
    class="btn btn-warning btn-sm w-full p-2 text-error-content md:btn-md"
    class:btn-disabled={finished}
    on:click={() => {
      pre = false;
      final = true;
    }}
  >
    {prompt}
  </div>
{:else if final}
  <div class="flex w-full gap-4">
    <div
      class="btn btn-error btn-sm flex-1 p-2  text-error-content md:btn-md"
      class:btn-disabled={finished}
      on:click={() => {
        pre = true;
        final = false;
        finished = true;
        dispatch("dangerOp");
      }}
    >
      {prompt_go}
    </div>
    <div
      class="btn btn-success btn-sm flex-1 p-2  text-error-content md:btn-md"
      class:btn-disabled={finished}
      on:click={() => {
        pre = true;
        final = false;
      }}
    >
      {prompt_cancel}
    </div>
  </div>
{/if}
