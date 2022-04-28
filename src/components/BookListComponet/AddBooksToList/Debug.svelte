<script>
  import AddToBookListModal from "./AddToBookListModal.svelte";

  const thisBooks = [999, 10000, 12123];
</script>

<AddToBookListModal shouldShow={true} {thisBooks} />
