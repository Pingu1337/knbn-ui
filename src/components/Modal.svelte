<script lang="ts">
  import { Button, Modal, Label, Input, Textarea, Alert } from "flowbite-svelte";
  import { TodoStatus } from "../types";
  import { Icon } from "flowbite-svelte-icons";
  import { writable } from "svelte/store";
  import { visited } from "$stores";

  export let user: string;

  let textareaprops = {
    id: "content",
    name: "content",
    label: "Description:",
    rows: 4,
    placeholder: "i really need to buy milk...",
  };

  export let open = false;
  export let externalTrigger = false;

  let showTip = writable(!$visited);

  const hideTip = () => {
    visited.set(true);
    setTimeout(() => {
      showTip.set(false);
    }, 200);
  };

  const addTodo = async (e: any) => {
    e.preventDefault();

    const todo: TodoRequest = {
      title: e.target.title.value,
      content: e.target.content.value,
      status: TodoStatus.Todo,
    };

    const response = await fetch(`/api/todo?user=${user}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      console.error("Error adding todo");
    }

    open = false;
    resetZoom();
    window.location.reload();
  };

  const resetZoom = () => {
    const scale = "scale(1)";
    document.body.style.webkitTransform = scale;
    document.body.style.transform = scale;
  };
  $: visited;
  $: sideMenuClass = !$visited ? "first" : "";
  $: alertClass = !$visited ? "text-blue-400 dark:text-blue-400" : "opacity-0";
</script>

{#if !externalTrigger}
  <div
    class={`side-menu ${sideMenuClass} select-none hidden md:flex lg:flex flex-row shadow-lg`}
    on:mouseleave={hideTip}
    on:touchend={hideTip}
  >
    {#if $showTip}
      <Alert color="blue" class={alertClass} style="background-color: #1f2937;">
        <Icon name="info-circle-solid" slot="icon" class="w-4 h-4" />
        <span class="font-medium">You can open this menu to add TODOs</span>
      </Alert>
    {/if}
    <Button
      class="add-todo-btn ring-0 dark:ring-0 focus:ring-0"
      on:click={() => (open = true)}><Icon name="plus-solid" class="w-5 h-5" /></Button
    >
  </div>
{/if}

<Modal bind:open size="xs" autoclose={false} class="w-full">
  <form class="flex flex-col space-y-6" on:submit={addTodo}>
    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">TODO:</h3>
    <Label class="space-y-2">
      <span>Title</span>
      <Input type="text" name="title" placeholder="buy milk" required />
    </Label>
    <Label class="space-y-2">
      <span>Description:</span>
      <Textarea {...textareaprops} />
    </Label>
    <Button type="submit" class="w-full1">Add todo</Button>
  </form>
</Modal>

<style>
  :global(.add-todo-btn) {
    width: 5.6rem;
    height: 100%;
    border-radius: none;
    padding-left: 1.5rem;
    transition: 0.1s ease-in-out !important;
    background-color: #1f2937 !important;
    padding-right: 0 !important;
    color: #fff;
    border: none !important;
    outline: none !important;
    cursor: pointer;
    font-size: 1.8rem;
    font-weight: 600;
  }
  :global(.add-todo-btn:hover) {
    padding-right: 1.25rem !important;
    padding-left: 1rem !important;
  }
  :global(.add-todo-btn:focus) {
    outline: none !important;
    border: none !important;
  }

  :global(.side-menu.first) {
    left: 0rem !important;
    width: 22rem !important;
  }

  :global(.side-menu.first .add-todo-btn) {
    padding-left: 0 !important;
    padding-right: 0 !important;
    width: 1rem !important;
  }

  :global(.side-menu.first .add-todo-btn:hover) {
    padding-left: 0 !important;
    width: 1rem !important;
  }

  .side-menu {
    z-index: 1000;
    background-color: #1f2937;
    position: fixed;
    overflow: hidden;
    width: 4rem;
    height: 4rem;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    left: -1.8rem;
    top: 10rem;
    transition: 0.1s ease-in-out;
  }
  .side-menu:hover {
    left: 0rem;
  }

  @media screen and (max-width: 768px) {
    .side-menu {
      bottom: 5rem;
      top: initial;
    }
  }
</style>
