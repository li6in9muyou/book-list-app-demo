<svelte:head>
    <title>盗版图书馆</title>
    <link href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📚</text></svg>"
          rel="icon">
</svelte:head>
<script>
    import MdExitToApp from 'svelte-icons/md/MdExitToApp.svelte'
    import SearchTip from './SearchTip.svelte'
    import {fileNameWithoutExtension} from './utility.js'
    import {search} from './searchEengine.js'
    import {CurrentUser} from '../lib/UserService.js'
    import DocumentCard from './DocumentCard.svelte'
    import VirtualScroll from '@sveltejs/svelte-virtual-list'
    import PleaseWait from '../lib/PleaseWait.svelte'

    let all_fucking_ebooks = []

    const populate_books = async () => {
        const url = 'http://localhost:8081/api/books'
        all_fucking_ebooks = await (await fetch(url)).json()
    }

    let query = ''
    let good
    let books_to_show
    let showing_count

    $: {
        const {results, success} = search(
            query, all_fucking_ebooks,
            (bk) => fileNameWithoutExtension(bk.path)
        )
        showing_count = results.length
        good = success
        books_to_show = results
    }
</script>
<main class="flex flex-col h-screen">
    <div class="navbar bg-base-200">
        <div class="flex">
            <a class="btn btn-ghost normal-case text-2xl font-serif">盗版图书馆</a>
        </div>
        <div class="ml-10 mr-8 flex-1 gap-6">
            <div class="w-1/4">
                <SearchTip {good} {showing_count}/>
            </div>
            <input autocapitalize="off"
                   autocomplete="off" bind:value={query}
                   class="text-4xl font-mono input input-accent input-bordered"
                   placeholder="搜索书本……" spellcheck="false"
                   type="text">
            <label class="swap swap-flip">
                <input checked type="checkbox"/>
                <span class="swap-on">
                    <span class="badge py-4">
                        正则表达式
                    </span>
                </span>
                <span class="swap-off">
                    <span class="badge py-4 badge-outline">
                        普通匹配
                    </span>
                </span>
            </label>
            <label class="swap swap-flip">
                <input type="checkbox"/>
                <span class="swap-on">
                    <span class="badge py-4">
                        区分大小写
                    </span>
                </span>
                <span class="swap-off">
                    <span class="badge py-4 badge-outline">
                        不区分
                    </span>
                </span>
            </label>
        </div>
        <div class="dropdown dropdown-end ml-auto">
            <label class="btn btn-ghost avatar justify-center" tabindex="0">
                {$CurrentUser}
            </label>
            <ul class="mt-3 p-2 shadow menu menu-compact
                dropdown-content bg-base-100 rounded-box w-52"
                tabindex="0">
                <li><a class="text-red-500 font-bold text-2xl text-warn font-mono">
                    <div class="w-8 h-8">
                        <MdExitToApp/>
                    </div>
                    Logout
                </a></li>
            </ul>
        </div>
    </div>
    <section class="overflow-y-auto flex-1">
        {#await populate_books()}
            <PleaseWait msg="图书正在加载"/>
        {:then books}
            <VirtualScroll items={books_to_show} let:item>
                <DocumentCard book={item}/>
            </VirtualScroll>
        {:catch error}
            <h1>加载失败了，原因是：{error.message.toLowerCase()}</h1>
        {/await}
    </section>
</main>