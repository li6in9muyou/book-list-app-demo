<script>
    import CreateBookList from './CreateBookList.svelte'
    import ListUserBookLists from './ListUserBookLists.svelte'
    import {setContext} from 'svelte'

    export let shouldShow = false
    setContext('pleaseCloseModal', () => shouldShow = false)
</script>

<div class="modal" class:modal-open={shouldShow}>
    <div class="modal-box relative max-w-sm">
        <label class="btn btn-sm btn-circle absolute right-2 top-2"
               on:click="{() => shouldShow = false}">✕</label>
        <h3 class="text-lg font-bold">添加到书单……</h3>
        <div class="divider"></div>
        <ListUserBookLists/>
        <div class="divider"></div>
        <CreateBookList/>
    </div>
</div>