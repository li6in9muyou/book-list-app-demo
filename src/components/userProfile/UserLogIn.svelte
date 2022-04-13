<script lang="ts">
  import { fade } from "svelte/transition";
  import {
    checkDisplayNameDoNotExists,
    loginUser,
  } from "../../lib/backendService/user.service";
  import { getNotify } from "../../lib/utility.js";
  import { getNotificationsContext } from "svelte-notifications";
  import AskDisplayName from "./AskDisplayName.svelte";
  import AskPassword from "./AskPassword.svelte";
  import { createEventDispatcher, onMount } from "svelte";
  import { links } from "../../routes.js";
  import { derived } from "svelte/store";

  const dispatch = createEventDispatcher();
  const { success, notify, error, info } = getNotify(
    getNotificationsContext().addNotification
  );

  let displayName, password, formValid;
  onMount(() => {
    formValid = derived([displayName, password], ([d, p]) => {
      return d.valid && p.valid;
    });
  });

  let pending = false;
  async function handleLogin() {
    pending = true;
    notify("正在登录");
    const dmp = $displayName.value;
    const pwd = $password.value;
    try {
      if (await checkDisplayNameDoNotExists(dmp)) {
        error(`"${dmp}" 还没有注册`);
      } else {
        await loginUser(dmp, pwd);
        success("登录成功了");
        dispatch("routeEvent", {
          afterLogIn: true,
          redirect: links.myBookLists,
        });
      }
    } catch (e) {
      error(`失败了，原因是：${e.message}`);
      throw e;
    } finally {
      pending = false;
    }
  }
</script>

<div
  class="m-auto flex w-full max-w-sm flex-1 flex-col p-4"
  in:fade={{ delay: 350 }}
>
  <div class="flex w-full flex-1 flex-col gap-4">
    <div
      class="text-serif flex w-full items-center gap-6 rounded border py-2 px-4 text-2xl text-primary"
    >
      <span>登录你的账号</span>
      <button
        class="btn btn-accent btn-sm ml-auto inline w-1/3"
        class:btn-disabled={pending || (formValid && !$formValid)}
        on:click={handleLogin}
      >
        登录
      </button>
    </div>

    <div class="w-full">
      <AskDisplayName bind:displayName />
    </div>

    <div class="w-full">
      <AskPassword bind:password repeatPassword={false} />
    </div>
  </div>
</div>
