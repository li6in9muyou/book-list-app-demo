<script>
  export let predicate = () => true;
  export let prompt = "这一项填写错了";
</script>

{#if predicate()}
  <span class="label-text-alt px-2">
    <span
      class="text-error underline underline-offset-2 font-bold decoration-2"
    >
      {prompt}
    </span>
  </span>
{/if}
