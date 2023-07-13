<script lang="ts">
  import "@skeletonlabs/skeleton/themes/theme-crimson.css";
  import "@skeletonlabs/skeleton/styles/skeleton.css";
  import "../app.postcss";
  import { LightSwitch, clipboard } from "@skeletonlabs/skeleton";
  import { browser } from "$app/environment";

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

  let copied: boolean = false;
</script>

{#if signedIn != null}
  <main>
    <header
      class="flex justify-end items-center mt-5 me-5 lg:flex-row flex-col"
    >
      <div
        class="flex justify-evenly gap-4 lg:items-center items-start lg:w-auto w-full lg:ms-0 ms-8 lg:flex-row flex-col-reverse"
      >
        {#if signedIn}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <small
            class="me-6 select-none cursor-pointer"
            use:clipboard={userCode}
            on:click={() => {
              copied = true;
              setTimeout(() => {
                copied = false;
              }, 1000);
            }}
          >
            {#if copied}
              <code>User code copied to clipboard!</code>
            {:else}
              <code class="flex"
                >User code: <pre> {userCode}</pre></code
              >
            {/if}
          </small>
          <button class="btn variant-soft me-14" on:click={signOut}
            >Sign out</button
          >
        {/if}
        <LightSwitch class="absolute right-2 top-7" />
      </div>
    </header>
    <slot />
  </main>
{/if}
