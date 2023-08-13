<script lang="ts">
  import { Modal } from "flowbite-svelte";
  import QrCode from "./QRCode.svelte";
  import { browser } from "$app/environment";

  export let showModal: boolean;
  export let user: string | null;

  $: userCode = user;

  // HACK: This should be replaced with a proper solution
  const cleanUpModal = () => {
    if (browser) {
      const qrModal = document.getElementById("qr-modal");
      const closeBtn = qrModal?.children[0];
      const modalDocument = qrModal?.children[1];
      qrModal?.parentElement?.classList.remove("w-full");
      qrModal?.parentElement?.classList.add("w-auto");

      console.log(closeBtn);
      closeBtn && qrModal?.removeChild(closeBtn);
      modalDocument && modalDocument.classList.remove("p-6");
    }
  };
</script>

<Modal
  bind:open={showModal}
  on:open={() => setTimeout(cleanUpModal, 10)}
  class="lg:w-auto p-0 rounded shadow-0;"
  style="padding:0; background-color: transparent; box-shadow: none;"
  id="qr-modal"
  size="xs"
  outsideclose
>
  <div class="flex flex-row justify-center items-center">
    <QrCode {userCode} size={250} />
  </div>
</Modal>
