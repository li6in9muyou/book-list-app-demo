<script>
  export let predicate = () => true;
  export let prompt = "这一项填写错了";
  import { fade } from "svelte/transition";
</script>

{#if predicate()}
  <span class="label-text-alt px-2" transition:fade>
    <span
      class="font-bold text-error underline decoration-2 underline-offset-2"
    >
      {prompt}
    </span>
  </span>
{/if}
