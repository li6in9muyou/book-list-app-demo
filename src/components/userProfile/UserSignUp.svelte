<script>
  import { fade } from "svelte/transition";
  import {
    checkDisplayNameDoNotExists,
    createUser,
    persistUser,
    successToken,
  } from "../../lib/backendService/UserService.js";
  import { getNotify } from "../../lib/utility.js";
  import { getNotificationsContext } from "svelte-notifications";
  import AskDisplayName from "./AskDisplayName.svelte";
  import AskPassword from "./AskPassword.svelte";
  import { debounce } from "lodash/function.js";
  import { createEventDispatcher } from "svelte";
  import { links } from "../../routes.js";

  const dispatch = createEventDispatcher();
  const { warning, success, notify, error, info } = getNotify(
    getNotificationsContext().addNotification
  );
  let displayName, password;
  let pending = false;

  async function handleSignup() {
    pending = true;
    notify("正在注册");
    const dmp = $displayName.value;
    const pwd = $password.value;
    try {
      if (!(await checkDisplayNameDoNotExists(dmp))) {
        error(`"${dmp}" 已经注册过了`);
      } else {
        const q = await createUser(dmp, pwd);
        if (successToken(q)) {
          persistUser(q);
          success("注册成功了");
          dispatch("routeEvent", {
            afterSignUp: true,
            redirect: links.myBookLists,
          });
        } else {
          error(`失败了，原因是：${q}`);
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
  <div class="flex h-3/4 w-full flex-col gap-6">
    <div class="text-serif w-full rounded border p-2 text-2xl text-primary">
      注册新账号
    </div>

    <div class="w-full">
      <AskDisplayName bind:displayName />
    </div>

    <div class="w-full">
      <AskPassword bind:password repeatPassword={true} />
    </div>
  </div>

  <div class="flex w-full flex-1 flex-col md:max-w-fit">
    <button
      class="btn btn-accent mr-auto w-full"
      class:btn-disabled={pending}
      on:click={debounce(handleSignup, 1000)}
    >
      注册
    </button>
  </div>
</div>
