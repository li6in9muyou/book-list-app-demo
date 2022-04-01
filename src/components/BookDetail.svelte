<script>
    import {fetchBookDetail} from '../lib/BookDetailService.js'
    import TextDisplay from '../lib/TextDisplay.svelte'
    import PleaseWait from '../lib/PleaseWait.svelte'

    export let thisBook = -1
    export let shouldShow = false
</script>
{#if thisBook !== -1}
    {#if shouldShow}
        {#await fetchBookDetail(thisBook)}
            <PleaseWait msg="详情加载中"/>
        {:then detail}
            <TextDisplay text="{detail}"/>
        {/await}
    {/if}
{/if}
