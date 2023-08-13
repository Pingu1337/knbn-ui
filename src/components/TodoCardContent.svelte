<script lang="ts">
  import { CloseButton } from "flowbite-svelte";
  import "../styles/todo-card-content.css";
  export let todo: Todo;
  export let user: string;

  let selected: string = todo.status.toString();

  const updateTodo = async () => {
    await fetch(`/api/todo/?id=${todo.id}&status=${selected}`, {
      method: "PUT",
    });
    window.location.reload();
  };

  const deleteTodo = async () => {
    const response = await fetch(`/api/todo/?id=${todo.id}&user=${user}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.error("An error occurred while deleting the todo.");
    }

    window.location.reload();
  };
</script>

<header class="card-header flex justify-between items-center pe-0 pt-1">
  <b>{todo.title}</b>
  <CloseButton on:click={deleteTodo} class="todo-close-btn" />
</header>
<section class="p-4">{todo.content}</section>

<select
  class="select variant-filled border-none lg:hidden"
  bind:value={selected}
  on:change={updateTodo}
>
  <option value="0">Todo</option>
  <option value="1">Doing</option>
  <option value="2">Done</option>
</select>
