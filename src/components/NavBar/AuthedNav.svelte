<script>
  import { MdBook, MdPerson } from "svelte-icons/md";
  import { FaSignOutAlt } from "svelte-icons/fa";
  import MenuItem from "../../lib/uiComponent/MenuItem.svelte";
</script>

<li>
  <div class="text-secondary">
    <MenuItem Icon={MdBook} text="我的书单" />
  </div>
</li>
<li>
  <div class="text-secondary">
    <MenuItem Icon={MdPerson} text="个人信息" />
  </div>
</li>
<li>
  <div class="text-error">
    <MenuItem Icon={FaSignOutAlt} text="注销" />
  </div>
</li>
