<script lang="ts">
  import { BottomNav, BottomNavItem, Tooltip } from "flowbite-svelte";
  import Modal from "./Modal.svelte";
  import { Icon } from "flowbite-svelte-icons";
  import AvatarDropdown from "./AvatarDropdown.svelte";
  import { writable } from "svelte/store";

  let modalOpen = false;
  export let user: string;

  let scroll = writable(document.body.scrollHeight);
  let scrollTopClass = "scroll-top-show";

  scroll.subscribe((value) => {
    scrollTopClass = value > 100 ? "scroll-top-show" : "scroll-top-hide";
  });

  const scrollToTop = () =>
    document.body.scrollIntoView({
      behavior: "smooth",
    });

  $: modalOpen;
</script>

<svelte:window on:scroll={() => scroll.set(window.scrollY)} />

<Modal {user} bind:open={modalOpen} externalTrigger />
<BottomNav
  position="fixed"
  navType="application"
  classInner="grid-cols-3"
  outerClass="md:hidden lg:hidden"
>
  <BottomNavItem btnName="Home" appBtnPosition="left" on:click={scrollToTop}>
    <span class={scrollTopClass}>
      <Icon name="arrow-up-solid" class="w-5 h-5kj" color="gray" />
      <Tooltip arrow={true}>Scroll to top</Tooltip>
    </span>
  </BottomNavItem>

  <div class="flex items-center justify-center">
    <BottomNavItem
      on:click={() => (modalOpen = true)}
      btnName="Create new item"
      appBtnPosition="middle"
      btnClass="inline-flex items-center justify-center w-10 h-10 font-medium bg-primary-600 rounded-full hover:bg-primary-700 group focus:ring-4 focus:ring-primary-300 focus:outline-none dark:focus:ring-primary-800"
    >
      <Icon name="plus-solid" class="text-white" />
      <Tooltip arrow={false}>Create new item</Tooltip>
    </BottomNavItem>
  </div>

  <BottomNavItem btnName="Profile" appBtnPosition="right">
    <AvatarDropdown {user} placement="top">
      <div
        class="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
      >
        <Icon name="user-circle-solid" class="w-5 h-5kj" color="gray" />
        <div class="flex relative" />
      </div>
    </AvatarDropdown>
    <Tooltip arrow={false}>Profile</Tooltip>
  </BottomNavItem>
</BottomNav>

<style>
  .scroll-top-show {
    opacity: 1;
    visibility: visible;
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  }
  .scroll-top-hide {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  }
</style>
