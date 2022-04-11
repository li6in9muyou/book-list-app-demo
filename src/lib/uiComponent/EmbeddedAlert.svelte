<script>
  import FaInfo from "svelte-icons/fa/FaInfo.svelte";

  export let icon = FaInfo;
  export let text = "重要信息";
  export let color = "";
</script>

<div
  class="alert w-fit min-w-full rounded-md p-2 shadow-lg"
  class:alert-error={"error" === color}
  class:text-error-content={"error" === color}
  class:alert-info={"info" === color}
  class:text-info-content={"info" === color}
  class:alert-success={"success" === color}
  class:text-success-content={"success" === color}
  class:alert-warning={"warning" === color}
  class:text-warning-content={"warning" === color}
>
  <div>
    <span class="h-6 w-6">
      <svelte:component this={icon} />
    </span>
    <span>{text}</span>
  </div>
</div>
