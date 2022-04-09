<script>
  import { FaSignInAlt } from "svelte-icons/fa";
  import { MdEdit } from "svelte-icons/md";
  import MenuItem from "../../lib/uiComponent/MenuItem.svelte";
  import { links } from "../../routes.js";

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
