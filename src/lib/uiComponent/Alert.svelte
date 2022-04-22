<script lang="ts">
  import { fade } from "svelte/transition";
  import { get } from "lodash/object.js";
  import FaInfo from "svelte-icons/fa/FaInfo.svelte";
  import MdWarning from "svelte-icons/md/MdWarning.svelte";
  import FaCheck from "svelte-icons/fa/FaCheck.svelte";
  import FaTimes from "svelte-icons/fa/FaTimes.svelte";
  import FaBell from "svelte-icons/fa/FaBell.svelte";
  import { fly, scale } from "svelte/transition";
  import { readable } from "svelte/store";

  export let notification = {};
  export let dynamic = get(
    notification,
    "dynamic",
    readable({
      text: get(notification, "text"),
      color: get(notification, "color", ""),
    })
  );
  export let onRemove = () => {};
  export let withoutStyles = false;

  let icon;
  $: {
    switch ($dynamic.color) {
      case "error":
        icon = FaTimes;
        break;
      case "warning":
        icon = MdWarning;
        break;
      case "success":
        icon = FaCheck;
        break;
      case "info":
        icon = FaInfo;
        break;
      default:
        icon = FaBell;
    }
  }
</script>

<div
  in:fly={{ x: -400, duration: 1000 }}
  out:scale
  class="z-40 m-4 ml-auto flex w-fit max-w-xs flex-row items-center
   gap-2 rounded-lg rounded p-2 px-4 shadow shadow-lg
   md:relative md:right-1/3 xl:relative xl:right-96"
  class:bg-base-100={$dynamic.color === "" || $dynamic.color === "notify"}
  class:bg-base-content={$dynamic.color === "" || $dynamic.color === "notify"}
  class:alert-error={"error" === $dynamic.color}
  class:alert-info={"info" === $dynamic.color}
  class:alert-success={"success" === $dynamic.color}
  class:alert-warning={"warning" === $dynamic.color}
>
  <span class="h-6 w-6">
    <svelte:component this={icon} />
  </span>
  {#key $dynamic.text}
    <span in:fade={{ duration: 200 }} class="flex-1 break-words text-lg">
      {$dynamic.text}
    </span>
  {/key}
</div>
