<script>
  import FaSignInAlt from "svelte-icons/fa/FaSignInAlt.svelte";
  import MdEdit from "svelte-icons/md/MdEdit.svelte";
  import MenuItem from "../../lib/uiComponent/MenuItem.svelte";
  import { links } from "../../routes.js";
  import FaBug from "svelte-icons/fa/FaBug.svelte";

  const { userSignUp, userLogIn } = links;
</script>

<li>
  <div class="text-secondary">
    <a href={userLogIn}>
      <MenuItem Icon={FaSignInAlt} text="登录" />
    </a>
  </div>
</li>
<li>
  <div class="text-error">
    <a href={userSignUp}>
      <MenuItem Icon={MdEdit} text="注册" />
    </a>
  </div>
</li>
{#if import.meta.env.DEV}
  <li>
    <div class="text-error">
      <a href={links.debugPage}>
        <MenuItem text="排错" Icon={FaBug} />
      </a>
    </div>
  </li>
{/if}
