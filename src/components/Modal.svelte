<script lang="ts">
  import { Button, Modal, Label, Input, Textarea } from "flowbite-svelte";
  import { TodoStatus } from "../types";

  export let user: string;

  let textareaprops = {
    id: "content",
    name: "content",
    label: "Description:",
    rows: 4,
    placeholder: "i really need to buy milk...",
  };

  let formModal = false;

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

    formModal = false;
    resetZoom();
    window.location.reload();
  };

  const resetZoom = () => {
    const scale = "scale(1)";
    document.body.style.webkitTransform = scale;
    document.body.style.transform = scale;
  };
</script>

<button
  class=" fixed lg:absolute left-10 lg:left-20 bottom-6 lg:bottom-20 btn-icon btn-icon-lg variant-filled select-none"
  on:click={() => (formModal = true)}>+</button
>

<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
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
