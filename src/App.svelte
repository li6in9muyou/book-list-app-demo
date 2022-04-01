<script>
    import Notifications from 'svelte-notifications'
    import Alert from './lib/Alert.svelte'
    import Library from './components/Library.svelte'
</script>

<Notifications item={Alert}>
    <Library/>
</Notifications>