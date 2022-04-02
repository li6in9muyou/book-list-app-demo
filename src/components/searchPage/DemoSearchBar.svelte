<script>
    import SearchBar from './SearchBar.svelte'
    import {get, map, range} from 'lodash'

    let error = {detail: ''}
    let results
    const hay = [
        '\\\\',
        ...map(range(10, 20), (num) => `风aaaaaaaaaaaaaaaaaaaaaa${num}`),
        ...map(range(20, 30), (num) => `林A.A.A${num}`),
        ...map(range(30, 40), (num) => `火A\\A\\A${num}`),
        ...map(range(50, 60), (num) => `山A\\A\\A${num}`)
    ]
</script>

<div class="grid gap-y-4 py-6 mx-6">
    <div class="md:grid md:grid-cols-5">
        <div class="md:col-span-4">
            <SearchBar {hay} bind:results bind:error/>
        </div>
        <div class="md:flex md:col-span-1 md:col-start-5 md:flex-start">
            <div class="divider md:col-auto md:m-0 md:divider-horizontal"></div>
            <div class="flex flex-1 gap-2
                        md:text-lg md:items-center md:items-stretch">
                <div class="border border-info flex-1 rounded p-2 md:min-w-fit">
                    数量：{get(results, 'length', 0)}
                </div>
                <div class="border rounded p-2 flex-1"
                     class:border-error={get(error, 'detail', '') !== ''}
                     class:border-success={get(error, 'detail', '') === ''}>
                    {get(error, 'detail', '')}
                </div>
            </div>
        </div>
    </div>
    <ul class="py-4 px-2 border-4 border-accent border-red-600 text-lg font-mono
               grid gap-4
               grid-cols-3
               justify-items-start
               sm:grid-cols-5
               md:grid-cols-6">
        {#each results ?? [] as result}
            <li class="break-all">{result}</li>
        {/each}
    </ul>
</div>
