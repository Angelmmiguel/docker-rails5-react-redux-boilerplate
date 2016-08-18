# Docker-React-Redux-boilerplate

This application has been developed with `nodejs v6.3.1`. To run it, you only need to clone the repository.

All the source code is in `src` folder:

* `components`: include the source code of all ReactJS components.
* `containers`: containers of ReactJS components. They are components too.
* `static`: static assets like images.
* `stylesheets`: page styles.
* `app.jsx`: entrypoint of the application.
* `index.html`: base template to build HTML file.

This application uses `webpack` to build assets and serve them in development mode (see next sections).

## Run the server

### Development

Use the following command to run a development server and open your browser in [http://localhost:8080](http://localhost:8080).

```bash
docker-compose up dev
```

This command will build all source code (JSX and SASS) from `src` folder and serve it. Webpack watches changes in files and reloads the page automatically.

### Production

To build assets and minify them use `npm run build`. This command will put output files into `dist` folder.

The project includes a simple `expressjs` server to serve files from `dist` folder. To run it, type `node server.js` in your console and visit [http://localhost:3000](http://localhost:3000).

You can execute both commands running:

```bash
docker-compose up production
```
