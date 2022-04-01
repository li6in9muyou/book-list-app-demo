<script>
    import Notifications from 'svelte-notifications'
    import ActionPanel from './components/ActionPanel.svelte'
    import Alert from './lib/Alert.svelte'
</script>

<Notifications item={Alert}>
    <ActionPanel subject="{1989}"/>
</Notifications>