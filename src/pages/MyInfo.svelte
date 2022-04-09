<script>
  import {
    CurrentAccessToken,
    CurrentUser,
  } from "../lib/backendService/UserService.js";
</script>

<div class="bg-primary text-xl text-primary-content">
  我的书单页面，我是{$CurrentUser}，我的accessToken是{$CurrentAccessToken}
</div>
