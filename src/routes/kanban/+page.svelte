<script lang="ts">
  import "$types/todo.d.ts";
  import Board from "$components/Board.svelte";
  import { useTodos } from "$hooks/useTodos.js";
  import type { PageData } from "./$types";
  import AddTodo from "$components/Modal.svelte";
  import QrCode from "$components/QRCode.svelte";
  import BottomNav from "$components/BottomNav.svelte";
  import { signedIn } from "$lib/stores";
  export let data: PageData;

  let todoBoard: TodoList[] = useTodos(data.todos);

  let user: string = data.user ?? "";
</script>

<div class="flex justify-evenly h-auto mt-6 main-flex">
  <section class="flex-col justify-center items-center side-section side-section-left" />
  <div class="flex justify-center align-center flex-col">
    <AddTodo {user} />
    <Board columnItems={todoBoard} {user} />
  </div>
  <section class="flex-col justify-center items-center side-section side-section-right">
    <QrCode userCode={user} size={200} />
  </section>
</div>
<div class="mt-5 pb-20 pt-10 lg:hidden">
  <div class="flex flex-col justify-center items-center text-center pb-20">
    <QrCode userCode={user} />
  </div>
</div>
{#if $signedIn}
  <BottomNav {user} />
{/if}

<style>
  @media screen and (max-width: 1700px) {
    .side-section {
      width: 100% !important;
    }
    .side-section-left {
      display: none !important;
    }
    .side-section-right {
      padding-top: 5rem;
      padding-bottom: 10rem;
    }
    .main-flex {
      flex-direction: column;
    }
  }
  @media screen and (max-width: 1023px) {
    .side-section-right {
      display: none !important;
    }
  }
  .side-section {
    display: flex;
    width: 250px;
  }
</style>
