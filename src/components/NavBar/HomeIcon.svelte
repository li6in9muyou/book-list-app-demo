<script>
  import { MdBook, MdPerson } from "svelte-icons/md";
  import { FaSignInAlt, FaSignOutAlt } from "svelte-icons/fa";
  import MdEdit from "svelte-icons/md/MdEdit.svelte";
  import {
    CurrentUser,
    isAuthenticated,
    logout,
  } from "../../lib/backendService/UserService.js";
</script>

<div class="dropdown dropdown-end">
  {#if $isAuthenticated}
    <label class="avatar btn btn-ghost justify-center" tabindex="0">
      {$CurrentUser}
    </label>
  {:else}
    <button class="btn btn-outline btn-sm border-2 btn-accent"
      >还没有登录</button
    >
  {/if}
  <ul
    class="dropdown-content menu rounded-box menu-compact
                mt-3 w-52 border border-2 bg-base-100 p-2 shadow-lg"
    tabindex="0"
  >
    {#if $isAuthenticated}
      <li>
        <a class="text-secondary">
          <div class="h-6 w-6">
            <MdBook />
          </div>
          我的书单
        </a>
        <a class="text-secondary">
          <div class="h-6 w-6">
            <MdPerson />
          </div>
          个人信息
        </a>
        <a class="text-error" on:click={logout}>
          <div class="h-6 w-6">
            <FaSignOutAlt />
          </div>
          注销
        </a>
      </li>
    {:else}
      <li>
        <a class="text-secondary">
          <div class="h-6 w-6">
            <FaSignInAlt />
          </div>
          登录
        </a>
        <a class="text-secondary">
          <div class="h-6 w-6">
            <MdEdit />
          </div>
          注册
        </a>
      </li>
    {/if}
  </ul>
</div>
