<script>
  import MdLibraryBooks from "svelte-icons/md/MdLibraryBooks.svelte";
  import { logout } from "../../lib/backendService/user.service";
  import MdPerson from "svelte-icons/md/MdPerson.svelte";
  import MdBook from "svelte-icons/md/MdBook.svelte";
  import FaSignOutAlt from "svelte-icons/fa/FaSignOutAlt.svelte";
  import MenuItem from "../../lib/uiComponent/MenuItem.svelte";
  import { links } from "../../routes.js";
  import { getNotify } from "../../lib/utility";
  import { getNotificationsContext } from "svelte-notifications";
  import DebugNav from "../../lib/uiComponent/DebugNav.svelte";

  const { notify } = getNotify(getNotificationsContext());

  const { landing, myBookLists, myInfo, myBorrowing } = links;
  const handleLogOut = async () => {
    logout();
    notify("您已注销");
  };
</script>

<li>
  <div class="text-secondary">
    <a href={myBookLists}>
      <MenuItem Icon={MdBook} text="我的书单" />
    </a>
  </div>
</li>
<li>
  <div class="text-primary">
    <a href={myBorrowing}>
      <MenuItem Icon={MdLibraryBooks} text="我借的书" />
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
  <DebugNav />
{/if}
