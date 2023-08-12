<script lang="ts">
  import "@skeletonlabs/skeleton/themes/theme-crimson.css";
  import "@skeletonlabs/skeleton/styles/skeleton.css";
  import "../app.postcss";
  import { LightSwitch } from "@skeletonlabs/skeleton";
  import { browser } from "$app/environment";
  import { Icon } from "flowbite-svelte-icons";

  let signedIn: boolean | null = null;
  let userCode: string | null = null;
  if (browser) {
    userCode = window.localStorage.getItem("user");
    signedIn = userCode ? true : false;
  }

  const signOut = () => {
    window.localStorage.removeItem("user");
    window.location.replace("/");
  };
</script>

{#if signedIn != null}
  <main>
    <header class="flex justify-between items-center mt-5 me-5 flex-row">
      <div class="flex items-center justify-center mx-4">
        <a href="/">
          <Icon name="check-circle-solid" size="lg" style="outline:none;" />
        </a>
      </div>
      <div
        class="flex gap-4 lg:items-center items-start w-auto lg:ms-0 ms-8 lg:flex-row flex-row justify-evenly"
      >
        {#if signedIn}
          <button class="btn variant-soft me-14" on:click={signOut}>Sign out</button>
        {/if}
        <LightSwitch class="absolute right-2 top-7" />
      </div>
    </header>
    <slot />
  </main>
{/if}

<style>
  :global(*) {
    box-sizing: border-box;
    margin: 0;
  }
</style>
