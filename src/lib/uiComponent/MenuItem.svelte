<script>
  import FaChevronCircleRight from "svelte-icons/fa/FaChevronCircleRight.svelte";

  export let Icon = FaChevronCircleRight;
  export let text = "菜单项";
</script>

<div class="flex w-max items-center gap-2">
  <div class="h-6 w-6">
    <Icon />
  </div>
  <div class="min-w-fit">
    {text}
  </div>
</div>
