<style>
    h2 {
        color: tomato;
        margin: 0 1em;
        flex: 1 0 auto;

        min-width: 10em;
        text-align: center;
    }
</style>
<script>
    export let showing_count
    export let good
</script>
{#if good}
    {#if showing_count > 0}
        <h2>共有{showing_count}条记录</h2>
    {:else}
        <h2>没有记录</h2>
    {/if}
{:else }
    <h2>搜索词错误</h2>
{/if}