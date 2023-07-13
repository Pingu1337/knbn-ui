import type { RequestHandler } from "@sveltejs/kit";
import { variables } from '../../../variables';
export const POST = ( async () => {

    const response = await fetch(`${variables.basePath}/user/new`, {method: "POST"});

    var userResponse = await response.json();
    console.log(userResponse);

    return new Response(JSON.stringify(userResponse));
}) satisfies RequestHandler;
