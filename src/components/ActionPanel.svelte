<style lang="postcss">
    .actionButton {
        @apply btn;
        @apply min-w-fit;
    }
</style>
<script>
    import TextDisplay from "../lib/TextDisplay.svelte";

    export let subject;
    import {repeat} from 'lodash'

    let cachedDetail = ''
    let shouldShowDetail = false

    async function fetch_detail(sub) {
        if (cachedDetail !== '') {
            return cachedDetail
        }
        const dd = `关于这本书（id: ${sub}） 的简要介绍，但是有点${repeat('长', 999)}。`
        await new Promise((resolve => setTimeout(resolve, 500)))
        cachedDetail = dd
        return dd
    }

    async function fetch_bookList(sub) {
        return await (await fetch(`http://localhost:8081/api/${sub}/book-lists`)).json()
    }

    let current_user = 'li6q'
    let shouldShowBookList = false;

</script>
<div>
    <main class="">
        <button class="actionButton"
                on:click={()=>{}}>
            加入箩筐
        </button>
        <button class="actionButton"
                on:click={()=>{() => shouldShowBookList = !shouldShowBookList}}>
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
            {#await fetch_bookList(current_user)}
                <h2>书单加载中……</h2>
            {:then bookLists}
                {#each bookLists as list}
                    <h2>{list.title}</h2>
                {/each}
            {/await}
        {/if}
        {#if shouldShowDetail}
            {#await fetch_detail(subject)}
                <h2>详情加载中……</h2>
            {:then detail}
                <TextDisplay text="{detail}"/>
            {/await}
        {/if}
    </comment>
</div>
