import { type RequestHandler, error } from "@sveltejs/kit";
import { variables } from "$variables";

export const GET = (async ({ url }) => {
  const user = url.searchParams.get("user");
  if (!user) {
    throw error(400, "Missing parameters");
  }

  const response = await fetch(`${variables.basePath}/todos/${user}`);

  var todos = await response.json();

  return new Response(JSON.stringify(todos));
}) satisfies RequestHandler;
