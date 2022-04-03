<script>
  import { field, form } from "svelte-forms";
  import { min, required } from "svelte-forms/validators";
  import PleaseCorrectMe from "../../lib/PleaseCorrectMe.svelte";
  import { startsWith } from "lodash/string.js";

  const alreadyExists = () => (value) => ({
    valid: !startsWith(value, "a"),
    name: "alreadyExists",
  });
  const email = field("email", "", [required(), alreadyExists()], {
    checkOnInit: true,
  });
  const password = field("password", "", [required(), min(2)], {
    checkOnInit: true,
  });
  const newUserInfo = form(email, password);
</script>

<div class="navbar bg-base-200">
  <a class="btn btn-ghost normal-case text-2xl font-serif">盗版图书馆</a>
</div>

<div class="flex flex-col gap-4 p-4 m-auto items-center max-w-xs">
  <div class="text-serif text-2xl text-primary border p-2 w-full rounded">
    注册新账号
  </div>
  <div class="form-control w-full">
    <label class="label">
      <span class="label-text text-lg">邮箱地址</span>
    </label>
    <input
      bind:value={$email.value}
      type="text"
      placeholder="Type here"
      class="input input-bordered w-full"
    />
    <label class="label">
      <PleaseCorrectMe
        prompt="一定要填写邮箱"
        predicate={() => $newUserInfo.hasError("email.required")}
      />
      <PleaseCorrectMe
        prompt="此邮箱已经注册过了"
        predicate={() => $newUserInfo.hasError("email.alreadyExists")}
      />
    </label>
  </div>

  <div class="form-control w-full">
    <label class="label">
      <span class="label-text text-lg">密码</span>
    </label>
    <input
      bind:value={$password.value}
      type="text"
      placeholder="Type here"
      class="input input-bordered w-full max-w-xs"
    />
    <label class="label">
      <PleaseCorrectMe
        prompt="密码至少两个字符"
        predicate={() => $newUserInfo.hasError("password.min")}
      />
    </label>
  </div>

  <button
    class="btn btn-accent mr-auto mt-8 w-full flex-stretch md:max-w-fit"
    class:btn-disabled={!$newUserInfo.valid}>注册</button
  >
</div>
