<script lang="ts">
  import { page } from "$app/stores";
  import { cleanPath } from "$lib/util/urlUtil";
  import { NavLi } from "flowbite-svelte";
  export let href: string;
  export let target: string = "_self";
  export let hidden: boolean = false;
  export let toggle: () => void;

  const handleClick = () => {
    if (!hidden) {
      toggle();
    }
  };

  let active = false;

  $: path = $page.url.pathname;
  $: {
    const url = cleanPath(href);
    active = (url !== "/" && path.startsWith(url)) || path === url;
  }
</script>

<NavLi {href} {active} {target} on:click={handleClick}><slot /></NavLi>
