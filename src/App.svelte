<script>
  import Notifications from "svelte-notifications";
  import Alert from "./lib/uiComponent/Alert.svelte";
  import OnBoard from "./components/userProfile/OnBoard.svelte";
</script>

<Notifications item={Alert}>
  <OnBoard />
</Notifications>
