### Usage
 Install the dependencies in both the root folder and again in the server directory.
Start websocket server, start app server. Use these commands:

```
npm install

cd server
npm install
npm start
```

open a new terminal tab:

```
cd ..
npm start
```

type in http://localhost:3000 on the browser


<br>
<br>
<br>
<br>


### React Boilerplate

A minimal and light dev environment for ReactJS.

### Usage

Clone the boilerplate and create your own git repo.

```
git clone git@github.com:nolotz/react-simple-boilerplate.git
```

Install the dependencies and start the server.

```
npm/yarn install
npm/yarn start
open http://localhost:3000
```

### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.

### Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint
```

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
