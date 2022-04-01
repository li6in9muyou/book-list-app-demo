<style lang="postcss">
    .actionButton {
        @apply btn;
        @apply min-w-fit;
    }
</style>
<script>
    import {setContext} from 'svelte'
    import TextDisplay from '../lib/TextDisplay.svelte'
    import {fetchBookDetail} from '../lib/BookDetailService.js'
    import AddToBookListModal from './AddToBookListModal.svelte'

    export let subject = -1
    setContext('thisBook', subject)

    let shouldShowAddToBookListModal = false
    let shouldShowDetail = false
</script>
<div>
    <main class="">
        <button class="actionButton"
                on:click={()=>{}}>
            加入箩筐
        </button>
        <button class="btn modal-button"
                on:click={() => shouldShowAddToBookListModal = true}>加入书单
        </button>
        <button class="actionButton"
                on:click={() => shouldShowDetail = !shouldShowDetail}>
            {#if shouldShowDetail}
                收起
            {:else}
                查看详情
            {/if}
        </button>
    </main>
    <comment>
        <AddToBookListModal bind:shouldShow="{shouldShowAddToBookListModal}"/>
        {#if shouldShowDetail}
            {#await fetchBookDetail(subject)}
                <h2>详情加载中……</h2>
            {:then detail}
                <TextDisplay text="{detail}"/>
            {/await}
        {/if}
    </comment>
</div>
