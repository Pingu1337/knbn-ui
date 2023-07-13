# todo-client

This is the client/frontend of the todo app.

## Prerequisites

- [node.js](https://nodejs.org/en)
- [docker](https://www.docker.com/get-started/)


## Running the project

before starting the client make sure to install the required dependencies with `npm install`

```bash
# Run the backend
docker compose up -d

# Start the client
cd todo-client
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open

# build the project
npm run build
```
