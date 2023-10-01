<script lang="ts">
  import { getNewsBanner, setNewsBanner } from "$lib/stores";
  import { Banner } from "flowbite-svelte";
  import { Icon } from "flowbite-svelte-icons";

  export let bannerId: string;
  export let href: string | null = null;

  let seenNewsBanner = getNewsBanner(bannerId);

  const setBannerSeenState = () => {
    seenNewsBanner = true;
    setNewsBanner(bannerId);
  };

  console.log(seenNewsBanner);
</script>

{#if !seenNewsBanner}
  <Banner id="news-banner" position="relative" on:click={setBannerSeenState}>
    <p class="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
      <span class="inline-flex p-1 mr-3 bg-gray-200 rounded-full dark:bg-gray-600">
        <Icon name="bullhorn-solid" class="w-4 h-4" style="padding: 0.1rem;" />
        <span class="sr-only">Bullhorn</span>
      </span>
      <span>
        <slot name="text">
          <span> text </span>
        </slot>
        <a
          {href}
          on:click={setBannerSeenState}
          class="inline font-medium text-primary-600 underline dark:text-primary-500 underline-offset-2 decoration-600 dark:decoration-500 decoration-solid hover:no-underline"
        >
          <slot name="readMore" />
        </a>
      </span>
    </p>
  </Banner>
{/if}
