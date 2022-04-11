<script>
  import MenuItem from "./MenuItem.svelte";
  import FaBug from "svelte-icons/fa/FaBug.svelte";
  import FaRunning from "svelte-icons/fa/FaRunning.svelte";
  import { links } from "../../routes.js";
  import { createEventDispatcher } from "svelte";
  import { authDebugUser } from "../backendService/user.service.js";

  const dispatch = createEventDispatcher();
</script>

<li>
  <div class="text-error">
    <a href={links.debugPage}>
      <MenuItem text="排错" Icon={FaBug} />
    </a>
  </div>
</li>
<li>
  <div
    class="text-success"
    on:click={() => {
      authDebugUser();
      dispatch("afterLogIn");
    }}
  >
    <MenuItem text="快速登录" Icon={FaRunning} />
  </div>
</li>
