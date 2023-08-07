<script lang="ts">
  import "../../@types/todo.d.ts";
  import Board from "../../components/Board.svelte";
  import { UseTodos } from "../../hooks/useTodos.js";
  import type { PageData } from "./$types";
  import AddTodo from "../../components/Modal.svelte";

  export let data: PageData;

  let todoBoard: TodoList[] = UseTodos(data.todos);
  let user: string = data.user ?? "";
</script>

<div class="pb-5 h-screen">
  <div class="flex justify-between align-center flex-col">
    <AddTodo {user} />
    <Board columnItems={todoBoard} {user} />
  </div>
</div>

<style>
  :global(*) {
    box-sizing: border-box;
    margin: 0;
  }
</style>
