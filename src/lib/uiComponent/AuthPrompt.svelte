<script>
  import DebugOverride from "../../pages/DebugOverride.svelte";
  import UserLogIn from "../../components/userProfile/UserLogIn.svelte";
  import UserSignUp from "../../components/userProfile/UserSignUp.svelte";

  let who = "debug";
</script>

<div class="tabs tabs-boxed justify-evenly p-2">
  <label>
    <div class="tab tab-sm " class:tab-active={who === "signup"}>
      注册
      <input
        type="radio"
        name="nav"
        class="radio radio-primary hidden"
        bind:group={who}
        value="signup"
      />
    </div>
  </label>
  <label>
    <div class="tab tab-sm " class:tab-active={who === "login"}>
      登录
      <input
        type="radio"
        name="nav"
        class="radio radio-primary hidden"
        bind:group={who}
        value="login"
      />
    </div>
  </label>
  <label>
    <div class="tab tab-sm " class:tab-active={who === "debug"}>
      排错超控
      <input
        bind:group={who}
        value="debug"
        type="radio"
        name="nav"
        class="radio radio-primary hidden"
        checked
      />
    </div>
  </label>
</div>

<div>
  {#if who === "debug"}
    <DebugOverride />
  {:else if who === "login"}
    <UserLogIn />
  {:else if who === "signup"}
    <UserSignUp />
  {/if}
</div>
