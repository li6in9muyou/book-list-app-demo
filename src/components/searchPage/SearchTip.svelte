<script>
  import FaCheck from "svelte-icons/fa/FaCheck.svelte";
  import FaTimes from "svelte-icons/fa/FaTimes.svelte";
  import FaQuestion from "svelte-icons/fa/FaQuestion.svelte";
  import EmbeddedAlert from "../../lib/uiComponent/EmbeddedAlert.svelte";
  import { fade } from "svelte/transition";

  export let showing_count;
  export let good;
</script>

<div class="font-mono">
  {#if good}
    {#if showing_count > 0}
      <div in:fade>
        <EmbeddedAlert icon={FaCheck} text="展示了{showing_count}条记录" />
      </div>
    {:else}
      <div in:fade>
        <EmbeddedAlert icon={FaQuestion} color="info" text="没有记录" />
      </div>
    {/if}
  {:else}
    <div in:fade>
      <EmbeddedAlert icon={FaTimes} color="error" text="搜索词错误" />
    </div>
  {/if}
</div>
