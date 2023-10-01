<script lang="ts">
  import "@skeletonlabs/skeleton/themes/theme-crimson.css";
  import "@skeletonlabs/skeleton/styles/skeleton.css";
  import "../app.postcss";
  import { browser } from "$app/environment";
  import Navbar from "$components/Navbar.svelte";

  let signedIn: boolean | null = null;
  let userCode: string | null = null;
  if (browser) {
    userCode = window.localStorage.getItem("user");
    signedIn = userCode ? true : false;
  }

  $: user = userCode as string;
</script>

{#if signedIn != null}
  <Navbar {userCode} {signedIn} />
  <main class="py-6">
    <slot />
  </main>
{/if}

<style>
  :global(*) {
    box-sizing: border-box;
    margin: 0;
  }
  :global(.circle) {
    border-radius: 50%;
  }
</style>
