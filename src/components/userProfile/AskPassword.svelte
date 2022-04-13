<script>
  import PleaseCorrectMe from "../../lib/uiComponent/PleaseCorrectMe.svelte";
  import { combined, field } from "svelte-forms";
  import { matchField, max, min, required } from "svelte-forms/validators";

  export let repeatPassword = false;

  export let pwd = field("pwd", "", [required(), min(4), max(20)], {
    stopAtFirstError: true,
    checkOnInit: true,
  });
  const pwdAgain = field("pwdAgain", "", [matchField(pwd)], {
    valid: false,
  });
  pwd.subscribe((f) => {
    pwdAgain.validate();
  });

  export let password = combined(
    "pwd",
    [pwd, pwdAgain],
    ([pwd, _]) => pwd.value
  );
</script>

<div class="form-control w-full">
  <label class="label">
    <span class="label-text text-lg">密码</span>
  </label>
  <input
    bind:value={$pwd.value}
    type="password"
    placeholder="此处输入密码"
    class="input input-bordered w-full tracking-widest"
  />
  <label class="label">
    <PleaseCorrectMe
      prompt="密码至少四个字符"
      shouldShow={$pwd.errors.indexOf("min") !== -1}
    />
    <PleaseCorrectMe
      prompt="密码至多二十个字符"
      shouldShow={$pwd.errors.indexOf("max") !== -1}
    />
  </label>
</div>

{#if repeatPassword}
  <div class="form-control w-full">
    <label class="label">
      <span class="label-text text-lg">确认密码</span>
    </label>
    <input
      bind:value={$pwdAgain.value}
      type="password"
      placeholder="此处重复密码"
      class="space input input-bordered w-full tracking-widest"
    />
    <label class="label">
      <PleaseCorrectMe
        prompt="两次输入不一致"
        shouldShow={$pwdAgain.errors.indexOf("match_field") !== -1}
      />
    </label>
  </div>
{/if}
