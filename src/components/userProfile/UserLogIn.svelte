<script>
  import { fade } from "svelte/transition";
  import {
    checkDisplayNameDoNotExists,
    loginUser,
    persistUser,
    successToken,
  } from "../../lib/backendService/UserService.js";
  import { getNotify } from "../../lib/utility.js";
  import { getNotificationsContext } from "svelte-notifications";
  import AskDisplayName from "./AskDisplayName.svelte";
  import AskPassword from "./AskPassword.svelte";
  import { createEventDispatcher } from "svelte";
  import { links } from "../../routes.js";
  import { debounce } from "lodash/function.js";

  const dispatch = createEventDispatcher();
  const { warning, success, notify, error, info } = getNotify(
    getNotificationsContext().addNotification
  );
  let displayName, password;
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
        const q = await loginUser(dmp, pwd);
        if (successToken(q)) {
          persistUser(q);
          success("登录成功了");
          dispatch("routeEvent", {
            afterLogIn: true,
            redirect: links.myBookLists,
          });
        } else {
          error(`密码错误，详情是：${q}`);
        }
      }
    } catch (e) {
      error(`失败了，原因是：${e.message}`);
      throw e;
    }
    pending = false;
  }
</script>

<div
  class="m-auto flex w-full max-w-sm flex-1 flex-col p-4"
  in:fade={{ delay: 350 }}
>
  <div class="flex w-full flex-1 flex-col items-stretch gap-4">
    <div class="text-serif w-full rounded border p-2 text-2xl text-primary">
      登录你的账号
    </div>

    <div class="w-full flex-1">
      <AskDisplayName bind:displayName />
    </div>

    <div class="mb-10 w-full flex-1">
      <AskPassword bind:password repeatPassword={false} />
    </div>
  </div>

  <div class="w-full flex-1 md:max-w-fit">
    <div class="w-full">
      <button
        class="btn btn-accent mr-auto w-full"
        class:btn-disabled={pending}
        on:click={debounce(handleLogin, 1000)}
      >
        登录
      </button>
    </div>
  </div>
</div>
