<script>
  import FaInfo from "svelte-icons/fa/FaInfo.svelte";

  export let icon = FaInfo;
  export let text = "重要信息";
  export let color = "";
</script>

<div
  class="alert shadow-lg w-fit p-2 rounded-md min-w-full"
  class:alert-error={"error" === color}
  class:alert-info={"info" === color}
  class:alert-success={"success" === color}
  class:alert-warning={"warning" === color}
>
  <div>
    <span class="w-6 h-6">
      <svelte:component this={icon} />
    </span>
    <span>{text}</span>
  </div>
</div>
