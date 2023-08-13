import { browser } from "$app/environment";
import { readable, writable, type Readable, type Writable } from "svelte/store";

export const visited: Writable<boolean> = writable(getVisited());
export const signedIn: Readable<boolean> = readable(false, (set) => {
  if (browser) {
    set(window.localStorage.getItem("user") ? true : false);
  }
});

if (visited) {
  visited.subscribe((value) => {
    if (value) {
      setVisited();
    }
  });
}

function setVisited() {
  if (browser) {
    window.localStorage.setItem("visited", "true");
  }
}

function getVisited(): boolean {
  if (browser) {
    const visited = window.localStorage.getItem("visited");
    return visited !== null;
  }
  return false;
}
