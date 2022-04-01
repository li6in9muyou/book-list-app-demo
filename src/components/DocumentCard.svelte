<script>
    import ActionPanel from './ActionPanel.svelte'
    import {fileNameWithoutExtension, takeExtension} from './utility.js'

    export let book
</script>

<main class="card bg-base-100 shadow-lg mx-4 my-3">
    <section class="card-body">
        <header class="card-title">
            <div class="badge badge-lg badge-outline badge-primary p-4 font-mono">{takeExtension(book.path)}</div>
            <div class="mx-6 max-w-2xl">
                {fileNameWithoutExtension(book.path)}
            </div>
        </header>
        <footer class="card-actions">
            <ActionPanel subject="{book.id}"/>
        </footer>
    </section>
</main>
