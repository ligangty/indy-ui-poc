## This is a poc project for new indy ui with reactjs framework

### Set up project

* Need to install node & npm: `sudo dnf install node -y`

### Install project dependencies

* Download whole project
* Use npm to install deps: `npm install `

### Start and see project result in dev mode

* Run `npm run build`
* Run `npm run server`
* Now you can see project result through [http://localhost:4000](http://localhost:4000)

### npm scripts

* build: compile sources and deploy all static files to `/build`
* compile: only compile sources to `build`
* dev: start webpack-dev-server to do front-end development
* server: start mock express server with all front-end code to do whole lifecycle debugging

### Project structure

* public: hold static files, like index.html entryfile, favicon
* src/client: client side sources
* src/server: a mock server using express.js to mock rest endpoints for client side data
