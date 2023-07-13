# knbn-ui
> Frontend repo for https://knbn.zip


🌐 [Live](https://knbn.zip) \
⚙️ [Backend](https://github.com/Pingu1337/knbn-api)


Knbn is a super simple kanban app built with rust & sveltekit.
It features a personal kanban without having to create an account or register in any way.

 When you "log in" you get a random UID, you can also choose to "log in" with a custom user code. 
 *Note that this is not guaranteed to be unique so if you choose the code `1` chances are someone else might select it as well.*

> Tasks are not private in any way other than locked behind the user code, so do not share any personal or sensitive information.


---

## Prerequisites

- [node.js](https://nodejs.org/en)
- *(optional)* [docker](https://www.docker.com/get-started/)
- *(optional)* [backend](https://github.com/Pingu1337/knbn-api) 
- *(optional)* [redis](https://hub.docker.com/r/redis/redis-stack)


## Running the project

before starting the client make sure to install the required dependencies with `npm install`

```bash
# Start the client
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open

# build the project
npm run build
```

## Contribute 

- **[Create Issue](https://github.com/Pingu1337/knbn-ui/issues/new)** 
- **[Create Pull Request](https://github.com/Pingu1337/knbn-ui/compare)**
#### Useful links
- [conventional commits](https://www.conventionalcommits.org/)

## License

[MIT](LICENSE)