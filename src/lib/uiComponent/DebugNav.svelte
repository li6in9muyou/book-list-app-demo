<script>
  import MenuItem from "./MenuItem.svelte";
  import FaBug from "svelte-icons/fa/FaBug.svelte";
  import FaRunning from "svelte-icons/fa/FaRunning.svelte";
  import DiDatabase from "svelte-icons/di/DiDatabase.svelte";
  import GiSoapExperiment from "svelte-icons/gi/GiSoapExperiment.svelte";
  import { links } from "../../routes.js";
  import { createEventDispatcher } from "svelte";
  import { authDebugUser } from "../backendService/user.service.js";

  const dispatch = createEventDispatcher();
</script>

<li>
  <div class="dropdown dropdown-end">
    <label tabindex="0" class="btn btn-sm text-warning">
      <MenuItem text="排错" Icon={FaBug} />
    </label>
    <ul
      tabindex="0"
      class="dropdown-content menu rounded-box relative top-full bg-base-100 p-2 shadow"
    >
      <li>
        <div
          class="w-full text-success "
          on:click={() => {
            authDebugUser();
            dispatch("afterLogIn");
          }}
        >
          <MenuItem text="快速登录" Icon={FaRunning} />
        </div>
      </li>
      <li>
        <div class="w-full text-error">
          <a href={links.debugPage}>
            <MenuItem text="排错" Icon={FaBug} />
          </a>
        </div>
      </li>
      <li>
        <div class="w-full text-warning">
          <a href={links.debugBookList}>
            <MenuItem text="新书单实现" Icon={GiSoapExperiment} />
          </a>
        </div>
      </li>
      <li>
        <div class="w-full text-info">
          <a href={links.database}>
            <MenuItem text="数据库" Icon={DiDatabase} />
          </a>
        </div>
      </li>
    </ul>
  </div>
</li>
