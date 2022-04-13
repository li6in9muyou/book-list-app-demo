<script>
  import DebugOverride from "../../pages/DebugOverride.svelte";
  import UserLogIn from "../../components/userProfile/UserLogIn.svelte";
  import UserSignUp from "../../components/userProfile/UserSignUp.svelte";
  import { get } from "lodash";

  let component = {
    login: UserLogIn,
    signup: UserSignUp,
    debug: DebugOverride,
  };
  const defaultComponent = import.meta.env.DEV ? "debug" : "login";
  let who = defaultComponent;
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
  {#if import.meta.env.DEV}
    <label>
      <div class="tab tab-sm" class:tab-active={who === "debug"}>
        排错超控
        <input
          bind:group={who}
          value="debug"
          type="radio"
          name="nav"
          class="radio radio-primary hidden"
        />
      </div>
    </label>
  {/if}
</div>

<div>
  <svelte:component this={get(component, who, defaultComponent)} />
</div>
