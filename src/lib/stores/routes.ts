import { browser } from '$app/environment';
import { readable, type Readable } from 'svelte/store';


export const kanbanRoute: Readable<string> = readable(getKanbanRoute());


function getKanbanRoute(): string {
    if (browser) {
        const storedUser = window.localStorage.getItem("user");
        return storedUser ?
            `/kanban?user=${storedUser}` : `/`;
    }
    return '/';
}
