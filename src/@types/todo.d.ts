
declare interface Todo { 
    id: string,
    title: string,
    content: string,
    status: TodoStatus,
}

declare interface TodoRequest { 
    title: string,
    content: string,
    status: TodoStatus,
}

declare interface TodoList {
    id: number,
    title: string,
    todos: Todo[],
}

declare interface TodoColumn {
    id: 1,
    title: "Todo",
    todos: Todo[],
}

declare interface InProgressColumn {
    id: 2,
    title: "In Progress",
    todos: Todo[],
}


declare interface DoneColumn {
    id: 3,
    title: "Done",
    todos: Todo[],
}


declare interface Kanban {
    columns: TodoList[]
 }