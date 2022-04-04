<script>
  export let predicate = () => true;
  export let prompt = "这一项填写错了";
  import { fade } from "svelte/transition";
</script>

{#if predicate()}
  <span class="label-text-alt px-2" transition:fade>
    <span
      class="text-error underline underline-offset-2 font-bold decoration-2"
    >
      {prompt}
    </span>
  </span>
{/if}
