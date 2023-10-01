<script lang="ts">
  import { LightSwitch } from "@skeletonlabs/skeleton";
  import {
    Navbar,
    NavBrand,
    NavUl,
    NavHamburger,
    Avatar,
    Button,
    NavLi,
  } from "flowbite-svelte";
  import { Icon } from "flowbite-svelte-icons";
  import AvatarDropdown from "./AvatarDropdown.svelte";
  import NavLink from "./NavLink.svelte";
  import { kanbanRoute } from "$stores";
  import BuyMeACoffeeIcon from "./BuyMeACoffeeIcon.svelte";
  import NewsBanner from "./NewsBanner.svelte";

  export let signedIn: boolean;
  export let userCode: string | null;

  $: user = userCode;
</script>

<NewsBanner bannerId="01.10.2023" href="/about/storage">
  <span slot="text">
    To increase the security of our data we have changed the way todos are stored. Some of
    your todos may have been lost in the process. We are sorry for the inconvenience.
  </span>
  <span slot="readMore"> Read more </span>
</NewsBanner>

<Navbar
  let:hidden
  let:toggle
  color="none"
  class="mx-auto lg:mt-6 navbar lg:rounded-lg"
  navClass="px-8 py-2.5 lg:shadow-lg w-full lg:w-3/4 lg:dark:bg-gray-800/50"
>
  <NavBrand
    href={$kanbanRoute}
    class="flex-row gap-2 mb-4 md:mb-0 lg:mb-0 justify-center items-center lg:flex md:flex hidden"
  >
    <Icon name="check-circle-solid" size="lg" style="outline:none;" />
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
      >Knbn.zip</span
    >
  </NavBrand>
  <div
    class="flex flex-row md:order-2 items-center justify-between w-full md:w-auto lg:w-auto"
    style="height: 52px;"
  >
    <div class="flex items-center">
      <NavHamburger on:click={toggle} style="outline:none; margin:0;" />
    </div>
    <div
      class="md:hidden lg:hidden flex flex-row gap-2 justify-center items-center nav-brand"
    >
      <Icon name="check-circle-solid" size="lg" style="outline:none;" />
      <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
        >Knbn.zip</span
      >
    </div>
    <div class="flex items-center gap-4">
      <AvatarDropdown {user}>
        {#if signedIn}
          <Avatar style="cursor:pointer;" />
        {/if}
      </AvatarDropdown>
      <LightSwitch class="" />
    </div>
  </div>

  <NavUl
    {hidden}
    id="nav-ul"
    slideParams={{ delay: 0, duration: 200 }}
    ulClass="flex flex-col p-3 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium select-none border-none md:items-center lg:items-center"
    activeClass="text-white bg-primary-500 md:bg-transparent md:text-primary-700 md:dark:text-white dark:bg-primary-500 md:dark:bg-transparent"
  >
    <NavLink href={$kanbanRoute} {hidden} {toggle}>Home</NavLink>
    <NavLink href="/about" {hidden} {toggle}>About</NavLink>
    <NavLink
      href="https://github.com/Pingu1337/knbn-ui"
      target="_blank"
      {hidden}
      {toggle}
    >
      <div class="flex flex-row items-center gap-2">
        GitHub<Icon name="arrow-up-right-from-square-outline" size="xs" />
      </div>
    </NavLink>

    <NavLi class="flex flex-row justify-center">
      <Button
        class="py-1 px-2 bg-primary-500"
        href="https://www.buymeacoffee.com/p1ngu"
        target="_blank"
      >
        <BuyMeACoffeeIcon />
        Buy me a coffee
      </Button>
    </NavLi>
  </NavUl>
</Navbar>

<style>
  :global(.navbar) {
    transition: 0.2s ease-in-out !important;
  }
  :global(svg) {
    outline: none;
  }
  @media screen and (min-width: 500px) {
    .nav-brand {
      padding-left: 68px;
    }
  }
  .nav-brand {
    transition: 0.1s ease-in-out;
  }
</style>
