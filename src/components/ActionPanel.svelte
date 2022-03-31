<style lang="postcss">
    .actionButton {
        @apply btn;
        @apply min-w-fit;
    }
</style>
<script>
    import TextDisplay from "../lib/TextDisplay.svelte";
    import {fetchBookDetail} from "../lib/BookDetailService.js";
    import {fetchBookList} from "../lib/BookListService";

    export let subject;

    let current_user = 'li6q'
    let shouldShowBookList = false;
    let shouldShowDetail = false
</script>
<div>
    <main class="">
        <button class="actionButton"
                on:click={()=>{}}>
            加入箩筐
        </button>
        <button class="actionButton"
                on:click={() => shouldShowBookList = !shouldShowBookList}>
            加入书单
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
        {#if shouldShowBookList}
            {#await fetchBookList(current_user)}
                <h2>书单加载中……</h2>
            {:then bookLists}
                {#each bookLists as list}
                    <h2>{list.title}</h2>
                {/each}
            {/await}
        {/if}
        {#if shouldShowDetail}
            {#await fetchBookDetail(subject)}
                <h2>详情加载中……</h2>
            {:then detail}
                <TextDisplay text="{detail}"/>
            {/await}
        {/if}
    </comment>
</div>
