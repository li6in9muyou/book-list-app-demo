<script>
  import FaSignInAlt from "svelte-icons/fa/FaSignInAlt.svelte";
  import MdEdit from "svelte-icons/md/MdEdit.svelte";
  import MenuItem from "../../lib/uiComponent/MenuItem.svelte";
  import { links } from "../../routes.js";
  import DebugNav from "../../lib/uiComponent/DebugNav.svelte";

  const { userSignUp, userLogIn } = links;
</script>

<li>
  <div class="text-primary">
    <a href={userLogIn}>
      <MenuItem Icon={FaSignInAlt} text="登录" />
    </a>
  </div>
</li>
<li>
  <div class="text-accent">
    <a href={userSignUp}>
      <MenuItem Icon={MdEdit} text="注册" />
    </a>
  </div>
</li>
{#if import.meta.env.DEV}
  <DebugNav />
{/if}
