<script>
    import {CurrentUser} from './UserService.js'
    import {addBooksToBookList, updateBooksInBookList} from './BookListService.js'
    import {getNotificationsContext} from 'svelte-notifications'
    import {getNotify} from '../components/utility.js'

    const {success, info} = getNotify(getNotificationsContext().addNotification)

    export let thisBook = -1
    export let list = {}
    let bookInBookList = list.books.indexOf(thisBook) !== -1

    async function handleChange() {
        if (bookInBookList) {
            await addBooksToBookList($CurrentUser, list.id, [thisBook])
            success(`已加入书单"${list.id}"`)
        } else {
            await updateBooksInBookList($CurrentUser, list.id, list.books.filter(id => id !== thisBook))
            info(`已从书单"${list.id}"中移除`)
        }
    }
</script>
<label class="label cursor-pointer justify-start">
    <input bind:checked="{bookInBookList}" class="checkbox checkbox-md checkbox-secondary"
           on:change={handleChange}
           type="checkbox">
    <span class="label-text truncate ml-2">{
        list.id
    }</span>
</label>