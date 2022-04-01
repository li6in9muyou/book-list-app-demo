<script>
    import {CurrentUser} from '../lib/UserService.js'
    import {fetchAllBookListOfUser} from '../lib/BookListService.js'
    import {sleep} from './utility.js'
    import {getContext} from 'svelte'
    import BookListCheckBox from '../lib/BookListCheckBox.svelte'

    const thisBook = getContext('thisBook')
</script>

<div class="overflow-y-auto">
    {#await sleep(0).then(() => fetchAllBookListOfUser($CurrentUser))}
        <div class="flex items-center space-x-4">
            <div class="ml-4 animate-spin radial-progress" style="--value:70;--size:1.5rem"></div>
            <span>书单加载中</span>
        </div>
    {:then bookLists}
        {#each bookLists as list}
            <BookListCheckBox {thisBook} {list}/>
        {/each}
    {:catch error}
        <p>加载失败，因为{error}</p>
    {/await}
</div>