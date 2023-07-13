import { TodoStatus } from "../types.js";

export const UseTodos = (todos: Todo[]): TodoList[] => {
    let todoBoard: TodoList[] = [
      { id: 1, title: "TODO", todos: [] },
      { id: 2, title: "DOING", todos: [] },
      { id: 3, title: "DONE", todos: [] },
    ];

    todos.forEach((todo) => {
      switch (todo.status) {
        case TodoStatus.Todo:
          todoBoard[0].todos.push(todo);
          break;
        case TodoStatus.InProgress:
          todoBoard[1].todos.push(todo);
          break;
        case TodoStatus.Done:
          todoBoard[2].todos.push(todo);
          break;
      }
    });
    return todoBoard;
};
