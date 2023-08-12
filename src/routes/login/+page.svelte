<script lang="ts">
  import { Button, Modal, Label, Input, Textarea } from "flowbite-svelte";
  import { writable } from "svelte/store";

  const urlParams = new URLSearchParams(window.location.search);
  const userCode = urlParams.get("code");

  let showModal = writable(false);

  const signIn = () => {
    if (userCode) {
      window.localStorage.setItem("user", userCode);
    }
    setTimeout(() => {
      window.location.replace("/");
    }, 100);
  };

  const checkExistingUser = () => {
    if (!userCode) {
      window.location.replace("/");
      return;
    }

    if (window.localStorage.getItem("user")) {
      showModal.set(true);
    } else {
      signIn();
    }
  };

  checkExistingUser();
  $: currentUser = window.localStorage.getItem("user");
</script>

<div style="margin-top: 4rem; text-align: center;">
  <h3>You are being signed in...</h3>
  {userCode}
</div>

<Modal bind:open={$showModal} size="xs" autoclose>
  <div class="text-center">
    <svg
      aria-hidden="true"
      class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      /></svg
    >
    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
      Do you want to overwrite the current user?
    </h3>
    <span class="flex justify-center items-center mb-4"
      >Current user: <code> <pre> {currentUser}</pre></code></span
    >
    <Button color="red" class="mr-2" on:click={signIn}>Yes, I'm sure</Button>
    <Button
      color="alternative"
      on:click={() => {
        showModal.set(false);
        window.location.replace("/");
      }}>No, cancel</Button
    >
  </div>
</Modal>
