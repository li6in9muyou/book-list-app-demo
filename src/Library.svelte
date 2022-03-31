<style>
    h1 {
        border: solid red .1em;
        text-align: center;
        color: blue;
        font-family: fangsong;
        font-size: 4em;
        margin: 0 0 .05em;
    }

    main {
        display: flex;
        flex-direction: column;
        padding: .1em .1em;
        height: 100%;
        overflow-y: hidden;
    }

    section {
        margin-top: .2em;
        border: solid firebrick .3em;
        padding: .2em .2em;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
    }

    section::-webkit-scrollbar {
        width: 1.2em;
        max-height: 3em;
    }

    section::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 0 12px crimson;
    }

    section::-webkit-scrollbar-thumb {
        background-color: darkred;
    }

    header {
        display: flex;
        align-items: center;
        padding: .4em .2em;
        border: solid indianred .3em;
    }

    header > input {
        margin: 0 0;
        width: 100%;
        outline: none;
        border: 0 solid crimson;
        transition: 1000ms;

        color: dodgerblue;
        font-size: 2em;
        font-weight: bold;
    }

    header > input:focus,
    header > input:hover {
        border-width: 2rem;
        transition: 200ms;
    }

    section > h1 {
        margin: .1em 0;
        color: mediumvioletred;
    }
</style>
<svelte:head>
    <title>盗版图书馆</title>
    <link href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📚</text></svg>"
          rel="icon">
</svelte:head>
<script>
    import DocumentCard from './components/DocumentCard.svelte'
    import {VirtualScroll} from 'svelte-virtual-scroll-list'
    import SearchTip from './components/SearchTip.svelte'
    import {fileNameWithoutExtension} from './components/utility.js'
    import {search} from './components/searchEengine.js'

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
<main>
    <h1>
        盗版图书的图书馆
    </h1>
    <header>
        <input bind:value={query} placeholder="使用正则表达式搜索" type="text">
        <aside>
            <SearchTip {good} {showing_count}/>
        </aside>
    </header>
    <section>
        {#await populate_books()}
            <h1>图书正在加载……</h1>
        {:then books}
            <VirtualScroll
                    data="{books_to_show}"
                    key="id"
                    let:data>
                <DocumentCard book={data}/>
            </VirtualScroll>
        {:catch error}
            <h1>加载失败了，原因是：{error.message.toLowerCase()}</h1>
        {/await}
    </section>
</main>