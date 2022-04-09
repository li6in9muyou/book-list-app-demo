<script>
  import ExpandedNav from "./ExpandedNav.svelte";
  import Nav from "./Nav.svelte";
  import { md } from "../../lib/utility.js";
</script>

<div class="navbar w-full justify-between gap-4 bg-base-200">
  <div class="btn btn-ghost font-serif text-2xl normal-case">
    all new 盗版图书馆
  </div>
  {#if $md}
    <ExpandedNav />
  {:else}
    <Nav />
  {/if}
</div>
