<script>
  import { get } from "lodash/object.js";
  import FaInfo from "svelte-icons/fa/FaInfo.svelte";
  import { fly, scale } from "svelte/transition";

  export let notification = {};
  export let color = get(notification, "color", "");
</script>

<div
  in:fly={{ x: -400, duration: 1000 }}
  out:scale
  class="alert z-40 m-4 ml-auto flex w-fit max-w-xs flex-row items-center
   justify-between rounded-lg rounded p-2 px-4 shadow shadow-lg
   md:relative md:right-1/3 xl:relative xl:right-96"
  class:alert-error={"error" === color}
  class:alert-info={"info" === color}
  class:alert-success={"success" === color}
  class:alert-warning={"warning" === color}
>
  <span class="h-6 w-6">
    <FaInfo />
  </span>
  <span class="flex-1 break-all">{notification.text}</span>
</div>
