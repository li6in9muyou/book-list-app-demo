<script>
  import FaCheck from "svelte-icons/fa/FaCheck.svelte";
  import FaTimes from "svelte-icons/fa/FaTimes.svelte";
  import FaQuestion from "svelte-icons/fa/FaQuestion.svelte";
  import EmbeddedAlert from "../../lib/uiComponent/EmbeddedAlert.svelte";
  import { fade } from "svelte/transition";
  import { getNotify } from "../../lib/utility.js";
  import { getNotificationsContext } from "svelte-notifications";

  export let showing_count;
  export let good;

  const { success, info, error } = getNotify(getNotificationsContext());

  $: {
    if (good) {
      if (showing_count > 0) {
        success(`展示了${showing_count}条记录`);
      } else {
        info("没有记录");
      }
    } else {
      error("搜索词错误");
    }
  }
</script>
