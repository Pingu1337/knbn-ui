<script lang="ts">
  import {
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
  } from "flowbite-svelte";
  import QrModal from "./QrModal.svelte";

  export let user: string | null;
  export let placement: string = "bottom";
  let open: boolean;
  let showModal = false;

  export let toggle = () => {
    open = !open;
  };

  const signOut = () => {
    toggle();
    window.localStorage.removeItem("user");
    window.location.replace("/");
  };

  $: open;
</script>

<slot {toggle} />

<Dropdown {placement} style={"z-index:99; text-align: left;"} bind:open>
  <DropdownHeader>
    <span class="block text-sm">User code</span>
    <span class="block truncate text-sm font-medium">{user}</span>
  </DropdownHeader>
  <DropdownItem
    class="hover:bg-gray-100 dark:hover:bg-gray-600"
    on:click={() => {
      showModal = true;
      toggle();
    }}>Show QR-Code</DropdownItem
  >
  <DropdownItem
    href="/settings"
    class="hover:bg-gray-100 dark:hover:bg-gray-600"
    on:click={toggle}>Settings</DropdownItem
  >
  <DropdownDivider />
  <DropdownItem class="hover:bg-gray-100 dark:hover:bg-gray-600" on:click={signOut}
    >Sign out</DropdownItem
  >
</Dropdown>

<QrModal {user} bind:showModal />
