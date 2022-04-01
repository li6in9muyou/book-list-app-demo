<script>
    export let msg = '加载中'
</script>

<div class="flex items-center space-x-4 p-2">
    <div class="ml-4 animate-spin radial-progress" style="--value:80;--size:1.5rem"></div>
    <span>{msg}</span>
</div>
