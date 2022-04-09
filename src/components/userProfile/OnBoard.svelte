<script>
  import { scale } from "svelte/transition";
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

    if (!(await checkDisplayNameDoNotExists(dmp))) {
      error(`"${dmp}" 已经注册过了`);
    } else {
      const q = await createUser(pwd, pwd);
      if (successToken(q)) {
        persistUser(q);
      } else {
        error("失败了");
      }
    }
    pending = false;
  }
</script>

<div class="m-auto flex w-full max-w-sm flex-1 flex-col p-4">
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
      out:scale
      class="btn btn-accent mr-auto w-full"
      class:btn-disabled={pending}
      on:click={handleSignup}
    >
      注册
    </button>
  </div>
</div>
