<script lang="ts">
  // @ts-nocheck
  import { flip } from "svelte/animate";
  import { dndzone } from "svelte-dnd-action";
  import TodoCardContent from "./TodoCardContent.svelte";

  export let user: string;

  const updateTodo = async (status: number, id: string) => {
    const response = await fetch(`/api/todo/?id=${id}&status=${status}`, {
      method: "PUT",
    });
    if (!response.ok) {
      console.error("Error updating todo status");
    }
  };

  export let columnItems: TodoList[];
  const flipDurationMs = 100;
  function handleDndConsiderColumns(e: CustomEvent) {
    columnItems = e.detail.items;
  }
  function handleDndFinalizeColumns(e: CustomEvent) {
    columnItems = e.detail.items;
  }
  function handleDndConsiderCards(cid: any, e: CustomEvent) {
    const colIdx = columnItems.findIndex((c) => c.id === cid);
    columnItems[colIdx].todos = e.detail.items;
    columnItems = [...columnItems];
  }
  async function handleDndFinalizeCards(cid: any, e: CustomEvent) {
    const colIdx = columnItems.findIndex((c) => c.id === cid);
    columnItems[colIdx].todos = e.detail.items;

    if (e.detail.info.trigger === "droppedIntoZone") {
      await updateTodo(colIdx, e.detail.info.id);
    }

    columnItems = [...columnItems];
  }
</script>

<section
  class="board"
  use:dndzone={{
    items: columnItems,
    flipDurationMs,
    type: "columns",
    dragDisabled: true,
  }}
  on:consider={handleDndConsiderColumns}
  on:finalize={handleDndFinalizeColumns}
>
  {#each columnItems as column (column.id)}
    <div
      class="column variant-filled-primary kanban-col"
      animate:flip={{ duration: flipDurationMs }}
    >
      <div class="column-title">{column.title}</div>
      <div
        class="column-content"
        use:dndzone={{ items: column.todos, flipDurationMs }}
        on:consider={(e) => handleDndConsiderCards(column.id, e)}
        on:finalize={(e) => handleDndFinalizeCards(column.id, e)}
      >
        {#each column.todos as todo (todo.id)}
          <div
            class="card p-2 variant-filled mt-3"
            animate:flip={{ duration: flipDurationMs }}
          >
            <TodoCardContent {todo} {user} />
          </div>
        {/each}
      </div>
    </div>
  {/each}
</section>

<style>
  .board {
    /* height: 90vh; */
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }
  .column {
    height: 100%;
    width: 350px;
    padding: 0.5em;
    float: left;
    overflow-y: hidden;
  }
  .column-content {
    height: 100%;
    overflow-y: auto;
    scrollbar-base-color: transparent;
    outline: none !important;
    padding-bottom: 2rem;
  }
  .column-content::-webkit-scrollbar {
    display: none;
  }
  .column-title {
    margin-bottom: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .kanban-col {
    height: 85vh;
    padding: 1rem;
    border-radius: 1rem;
  }
</style>
