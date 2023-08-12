<script lang="ts">
  import { browser } from "$app/environment";
  import { writable, type Writable } from "svelte/store";
  import QrCode from "../../../components/QRCode.svelte";

  let user: Writable<string | null> = writable(null);

  if (browser) {
    user.set(window.localStorage.getItem("user"));
  }
</script>

<article
  class="flex flex-col justify-center items-center lg:w-2/4 w-3/4 mx-auto mt-5 pb-10"
>
  <h1 class="h1 mb-4">QR-Code Sign In</h1>

  <section class="mt-6">
    <p>
      Experience the convenience of effortlessly transferring your Kanban sessions between
      devices using QR codes. This innovative feature streamlines your workflow, ensuring
      you can seamlessly continue your work on different platforms without any hassle.
      Below, we've outlined how QR Code Sign-In works and how it can enhance your
      productivity.
    </p>
  </section>
  <section class="mt-8">
    <ol class="list">
      <li class="flex">
        <span>
          <span class="bullet bg-primary-500/50">1</span>
        </span>
        <span class="flex-auto">
          <strong>Scan the QR Code:</strong> Begin by scanning the QR code provided below using
          your smartphone's camera. This action initiates transfer process.
        </span>
      </li>
      <li class="flex">
        <span>
          <span class="bullet bg-primary-500/50">2</span>
        </span>
        <span class="flex-auto">
          <strong>Session Transfer:</strong> Once the QR code is scanned, your active Kanban
          session will be instantly transferred from your current device to your smartphone.
        </span>
      </li>
      <li class="flex">
        <span>
          <span class="bullet bg-primary-500/50">3</span>
        </span>
        <span class="flex-auto">
          <strong>Continue Seamlessly:</strong> With the session now on your phone, you can
          seamlessly pick up where you left off. Your Kanban board, tasks, and progress are
          all at your fingertips.
        </span>
      </li>
    </ol>
  </section>

  {#if $user}
    <div class="qr-wrapper">
      <QrCode userCode={$user} size={300} showInfo={false} />
    </div>
  {/if}
</article>

<style>
  .qr-wrapper {
    margin-top: 4rem;
    width: 300px;
    height: 300px;
  }
  .bullet {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 1.8rem;
    height: 1.8rem;
    padding-right: 0.08rem;
  }
  .list li {
    margin-bottom: 0.8rem;
  }
</style>
