<script>
  import FaCheck from "svelte-icons/fa/FaCheck.svelte";
  import FaTimes from "svelte-icons/fa/FaTimes.svelte";
  import FaQuestion from "svelte-icons/fa/FaQuestion.svelte";
  import EmbeddedAlert from "../../lib/uiComponent/EmbeddedAlert.svelte";

  export let showing_count;
  export let good;
</script>

{#if good}
  {#if showing_count > 0}
    <EmbeddedAlert
      icon={FaCheck}
      color="success"
      text="展示了{showing_count}条记录"
    />
  {:else}
    <EmbeddedAlert icon={FaQuestion} color="info" text="没有记录" />
  {/if}
{:else}
  <EmbeddedAlert icon={FaTimes} color="error" text="搜索词错误" />
{/if}
