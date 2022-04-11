<script>
  import DebugOverride from "../../pages/DebugOverride.svelte";

  export let params = {};
</script>

<div class="max-w-xs">
  <div class="tabs p-4">
    <a class="tab tab-lifted" href="#/auth/login"> 登录 </a>
    <a class="tab tab-lifted" href="#/auth/signup"> 注册 </a>
    <a class="tab tab-lifted" href="#/auth/__debugOverride"> 排错超控 </a>
    <DebugOverride />
  </div>
</div>
