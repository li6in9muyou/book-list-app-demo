<script lang="ts">
  import { fade, fly, scale } from "svelte/transition";
  import { get } from "lodash/object.js";
  import FaInfo from "svelte-icons/fa/FaInfo.svelte";
  import MdWarning from "svelte-icons/md/MdWarning.svelte";
  import FaCheck from "svelte-icons/fa/FaCheck.svelte";
  import FaTimes from "svelte-icons/fa/FaTimes.svelte";
  import FaBell from "svelte-icons/fa/FaBell.svelte";
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
  class="m-4 ml-auto flex w-fit max-w-xs flex-row items-center
   rounded-lg rounded p-2 px-4 pr-1 shadow shadow-lg
   md:relative md:right-1/3 xl:relative xl:right-96"
  class:bg-base-100={$dynamic.color === "" || $dynamic.color === "notify"}
  class:text-base-content={$dynamic.color === "" || $dynamic.color === "notify"}
  class:alert-error={"error" === $dynamic.color}
  class:alert-info={"info" === $dynamic.color}
  class:alert-success={"success" === $dynamic.color}
  class:alert-warning={"warning" === $dynamic.color}
>
  <span class="h-6 w-6">
    <svelte:component this={icon} />
  </span>
  {#key $dynamic.text}
    <span in:fade={{ duration: 200 }} class="mx-2 flex-1 break-words text-lg">
      {$dynamic.text}
    </span>
  {/key}
  <div class="btn btn-circle btn-ghost btn-sm mx-0" on:click|once={onRemove}>
    <div class="h-4 w-4">
      <FaTimes />
    </div>
  </div>
</div>
