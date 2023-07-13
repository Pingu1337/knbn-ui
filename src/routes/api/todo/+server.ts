import { type RequestHandler, error } from "@sveltejs/kit";
import { variables } from '../../../variables';
export const GET = ( async ({ url }) => {

    
    const id = url.searchParams.get("id");

    if (!id) {
        throw error(400, "Missing parameters");
    }

    const response = await fetch(`${variables.basePath}/todo/${id}`);

    var todo = await response.json();

    return new Response(JSON.stringify(todo));
}) satisfies RequestHandler;


export const POST = (async ({ url, request }) => {

    if (!url.searchParams.get("user")) {
        throw error(400, "Missing user parameter");
    }
    
    const user = url.searchParams.get("user");

    const todo = await request.json();

    const response = await fetch(`${variables.basePath}/todo/${user}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(todo)
    });

    return new Response(JSON.stringify(await response.json()));
}) satisfies RequestHandler;

export const PUT = (async ({ url }) => {

    const id = url.searchParams.get("id");
    const status = url.searchParams.get("status");

    if (!id || !status) {
        throw error(400, "Missing parameters");
    }


    const response = await fetch(`${variables.basePath}/todo/${id}/${status}`, { method: "PUT" });

    var todo = await response.json();

    return new Response(JSON.stringify(todo));
}) satisfies RequestHandler;

export const DELETE = ( async ({ url }) => {
    
    const id = url.searchParams.get("id");
  
    if (!id) {
        throw error(400, "Missing parameters");
    }

    const response = await fetch(`${variables.basePath}/todo/${id}`, { method: "DELETE" });

    var todo = await response.json();

    return new Response(JSON.stringify(todo));
}) satisfies RequestHandler;