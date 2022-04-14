<script>
  import ExpandedNav from "./ExpandedNav.svelte";
  import Nav from "./Nav.svelte";
  import { md } from "../../lib/utility";
  import { links } from "../../routes.js";
</script>

<div class="navbar sticky top-0 z-50 w-full justify-between gap-4 bg-base-200">
  <div class="btn btn-ghost font-serif text-2xl normal-case">
    <a href={links.landing}>盗版图书馆</a>
  </div>
  {#if $md}
    <ExpandedNav />
  {:else}
    <Nav />
  {/if}
</div>
