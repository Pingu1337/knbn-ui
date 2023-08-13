import type { PageLoad } from "./$types";

export const load = (async ({ fetch, params, url }) => {
  const user = url.searchParams.get("user");
  if (!user) {
    return { todos: [], user };
  }

  const todoResponse = await fetch(`/api/todos?user=${user}`);

  const todos: Todo[] = await todoResponse.json();

  return {
    todos,
    user,
  };
}) satisfies PageLoad;
