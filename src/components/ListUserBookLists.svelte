<script>
    import {CurrentUser} from '../lib/UserService.js'
    import {fetchAllBookListOfUser} from '../lib/BookListService.js'
    import {getContext} from 'svelte'
    import BookListCheckBox from '../lib/BookListCheckBox.svelte'
    import PleaseWait from '../lib/PleaseWait.svelte'

    const thisBook = getContext('thisBook')
</script>

<div class="overflow-y-auto">
    {#await fetchAllBookListOfUser($CurrentUser)}
        <PleaseWait msg="书单加载中"/>
    {:then bookLists}
        {#each bookLists as list}
            <BookListCheckBox {thisBook} {list}/>
        {/each}
    {:catch error}
        <p>加载失败，因为{error}</p>
    {/await}
</div>