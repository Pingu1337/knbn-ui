<script lang="ts">
  import {
    computePosition,
    autoUpdate,
    offset,
    shift,
    flip,
    arrow,
  } from "@floating-ui/dom";
  import { storePopup, type PopupSettings, popup } from "@skeletonlabs/skeleton";
  import { Popover } from "flowbite-svelte";
  import { Icon } from "flowbite-svelte-icons";
  import QrCodeImage from "svelte-qrcode-image/QRCodeImage.svelte";

  export let userCode: string | null;
  export let isPopup: boolean = false;
  export let size: number = 300;
  export let showInfo: boolean = true;

  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

  const popupClick: PopupSettings = {
    event: "hover",
    target: "popupClick",
    placement: "top",
  };

  $: loginUrl = `https://knbn.zip/login?code=${userCode}`;
</script>

{#if isPopup}
  <button class="btn variant-soft" use:popup={popupClick}>Show QR-code</button>

  <div class="card variant-filled overflow-hidden shadow-md" data-popup="popupClick">
    <div>
      <QrCodeImage
        text={loginUrl}
        margin={2}
        displayType="canvas"
        width={size}
        displayWidth={size}
      />
    </div>
  </div>
{:else}
  <div class="text-center">
    <div class="card variant-filled overflow-hidden shadow-md">
      <div>
        <QrCodeImage
          text={loginUrl}
          margin={2}
          displayType="canvas"
          width={size}
          displayWidth={size}
        />
      </div>
    </div>
    {#if showInfo}
      <div
        class="flex items-center justify-center text-sm font-light text-gray-500 dark:text-gray-400 p-2 text-center"
      >
        <button id="b3">
          <div class="flex flex-row justify-center items-center">
            What is this?
            <Icon name="question-circle-solid" class="w-4 h-4 ml-1.5" />
            <span class="sr-only">Show information</span>
          </div>
        </button>
      </div>
    {/if}
  </div>
{/if}

<Popover
  triggeredBy="#b3"
  class="w-80 text-sm font-light text-gray-500 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
  placement="bottom"
>
  <div class="p-3 space-y-2">
    <h3 class="font-semibold text-gray-900 dark:text-white">
      Transfer this session to another device
    </h3>
    Scan this QR code to transfer this session to another device.
    <a
      href="/about/qr"
      class="flex items-center font-medium text-primary-600 dark:text-primary-500 dark:hover:text-primary-600 hover:text-primary-700"
    >
      Read more <Icon
        name="chevron-right-outline"
        class="w-2 h-2 ml-1.5 text-primary-600 dark:text-primary-500"
      />
    </a>
  </div>
</Popover>
