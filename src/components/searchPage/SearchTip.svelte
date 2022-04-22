<script>
  import { getNotify } from "../../lib/utility.js";
  import { getNotificationsContext } from "svelte-notifications";
  import { onDestroy, onMount } from "svelte";
  import { writable } from "svelte/store";

  export let showing_count;
  export let good;

  const { dynamic } = getNotify(getNotificationsContext());
  const { removeNotification } = getNotificationsContext();

  const tip = writable({});

  $: {
    if (good) {
      if (showing_count > 0) {
        tip.set({
          color: "success",
          text: `展示了${showing_count}条记录`,
        });
      } else {
        tip.set({
          color: "info",
          text: "没有记录",
        });
      }
    } else {
      tip.set({
        color: "error",
        text: "搜索词错误",
      });
    }
  }

  onMount(() => {
    dynamic("searchTip", tip);
  });
  onDestroy(() => {
    removeNotification("searchTip");
  });
</script>
