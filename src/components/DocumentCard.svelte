<script>
    export let book;

    import {fileNameWithoutExtension, takeExtension} from "./utility.js";
    import ActionPanel from './ActionPanel.svelte';
</script>

<style>
    h1 > span.book_format {
        border: dashed purple .1em;
        border-bottom: none;
        border-top: none;
        color: cyan;
        font-family: monospace;
        font-size: 1em;
        padding: 0 .1em;
    }

    h1 > span.book_title {
        border: dashed lightcoral .1em;
        border-right: none;
        border-left: none;
        color: darkgreen;
        font-family: monospace;
        font-size: 1em;
        padding: 0 1em;
        word-break: break-all;
        margin-left: .4em;
        transition: 1000ms;
    }

    h1 > span.book_title:hover {
        transform: translateX(2em) scale(1.5);
        transition: 500ms;
    }

    h1 {
        display: flex;
        align-items: center;

        border: solid yellow .1em;
        color: green;
        font-family: monospace;
        font-size: 4em;
        margin: 0 0 .5em;
        padding: .3em .2em;
    }

    div {
        border: dotted orange .5em;
        border-right: none;
        border-left: none;
        padding: .4em .4em;
        margin-bottom: 2em;
    }

</style>

<div>
    <h1>
        <span class="book_format">
            {takeExtension(book.path)}
        </span>
        <span class="book_title">
            {fileNameWithoutExtension(book.path)}
        </span>
    </h1>
    <ActionPanel subject={book.id}/>
</div>
