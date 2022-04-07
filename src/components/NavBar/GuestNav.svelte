<script>
  import { FaSignInAlt } from "svelte-icons/fa";
  import { MdEdit } from "svelte-icons/md";
  import MenuItem from "../../lib/uiComponent/MenuItem.svelte";
</script>

<li>
  <div class="text-secondary">
    <MenuItem Icon={FaSignInAlt} text="登录" />
  </div>
</li>
<li>
  <div class="text-error">
    <MenuItem Icon={MdEdit} text="注册" />
  </div>
</li>
