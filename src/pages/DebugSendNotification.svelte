<script lang="ts">
  import {
    CurrentAccessToken,
    CurrentUser,
  } from "../lib/backendService/user.service";
  import { getNotificationsContext } from "svelte-notifications";
  import { getNotify } from "../lib/utility";
  import { toPairs } from "lodash";
  import { createEventDispatcher, onDestroy } from "svelte";
  import { readable } from "svelte/store";

  const dispath = createEventDispatcher();

  const msgTypes = toPairs(getNotify(getNotificationsContext()));

  const userLifeCycleEvent = (ev) => {
    dispath("routeEvent", { type: ev });
  };
  onDestroy(() => {
    getNotificationsContext().removeNotification("demo");
  });
</script>

<div class="flex flex-col gap-4 p-4">
  <div
    class="break-all rounded rounded-lg bg-primary p-4 text-xl text-primary-content"
  >
    我的书单页面，我是{$CurrentUser}，我的accessToken是{$CurrentAccessToken}
  </div>
  {#each msgTypes as [type, func]}
    <button
      class="btn btn-accent btn-lg font-mono normal-case"
      on:click={() => {
        if (type !== "dynamic") {
          func(`颜色是${type}，消息一般有十个字。`);
        } else {
          func(
            "demo",
            readable({ text: "稍等" }, (set) => {
              const colors = ["info", "success", "error", "warning", ""];
              let idx = 0;
              const i = setInterval(() => {
                idx %= colors.length - 1;
                set({
                  text: `动态示例消息：${new Date().toLocaleTimeString()}`,
                  color: colors[++idx],
                });
              }, 200);
              return () => {
                clearInterval(i);
              };
            })
          );
        }
      }}
    >
      send {type}
    </button>
  {/each}

  <button
    class="btn btn-accent btn-lg font-mono normal-case"
    on:click={() => userLifeCycleEvent("afterDeleteAccount")}
  >
    发送afterDeleteAccount事件
  </button>
  <button
    class="btn btn-accent btn-lg font-mono normal-case"
    on:click={() => userLifeCycleEvent("afterLogOut")}
  >
    发送afterLogOut事件
  </button>
  <button
    class="btn btn-accent btn-lg font-mono normal-case"
    on:click={() => userLifeCycleEvent("afterSignUp")}
  >
    发送afterSignUp事件
  </button>
  <button
    class="btn btn-accent btn-lg font-mono normal-case"
    on:click={() => userLifeCycleEvent("afterLogIn")}
  >
    发送afterLogIn事件
  </button>
</div>
