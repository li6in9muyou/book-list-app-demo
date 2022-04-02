<script>
  let count = 1000;
  const increment = () => {
    count += 1;
  };
</script>

<button on:click={increment}>
  Clicks: {count}
</button>

<style>
  button {
    @apply btn btn-accent;
    @apply text-lg;
  }
</style>
