<script>
  import { logout } from "../../lib/backendService/user.service";
  import MdPerson from "svelte-icons/md/MdPerson.svelte";
  import MdBook from "svelte-icons/md/MdBook.svelte";
  import FaSignOutAlt from "svelte-icons/fa/FaSignOutAlt.svelte";
  import FaBug from "svelte-icons/fa/FaBug.svelte";
  import MenuItem from "../../lib/uiComponent/MenuItem.svelte";
  import { links } from "../../routes.js";
  import { debounce } from "lodash/function.js";
  import { getNotify } from "../../lib/utility.js";
  import { getNotificationsContext } from "svelte-notifications";
  const { notify } = getNotify(getNotificationsContext().addNotification);

  const { landing, myBookLists, myInfo } = links;
</script>

<li>
  <div class="text-secondary">
    <a href={myBookLists}>
      <MenuItem Icon={MdBook} text="我的书单" />
    </a>
  </div>
</li>
<li>
  <div class="text-secondary">
    <a href={myInfo}>
      <MenuItem Icon={MdPerson} text="个人信息" />
    </a>
  </div>
</li>
<li>
  <div class="text-error">
    <a href={landing} on:click={handleLogOut}>
      <MenuItem Icon={FaSignOutAlt} text="注销" />
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
