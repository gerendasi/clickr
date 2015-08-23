# clickr
repo for shared development of clickr

## Dependencies
The Clickr app uses:

* Gulp - this is the build system we use to compile up our SCSS and JavaScript, along with providing auto-refresh when we make changes in development.
* Node - we run a pretty simple Node server to facilitate the auto-refresh. Really, we won't need the server to be Node in production as we're generating static HTML/CSS/JS files in the end.
* npm -  npm (Node Package Manager) is used to manage all of our dependencies for the front end and development backend. All clickr's required plugins and such are listed within package.json, so the project can be worked on by various developers who'll all have the relevant dependencies easily and quickly :) Yay npm!
* Browserify - All JavaScript is set up within Browserify, which allows for fornt-end JavaScript to be structured as npm-style Node modules with require() statements for dependencies. This allows us to manage all of Clickr's front end dependencies using npm and keeps things modular.
* React - our front end app is built with the React framework to keep track of application states. We don't do anything too wild or complicated at the moment, so it's largely keeping things simple and well structured for a single page web app.

## How to build and run Clickr
1. Ensure you have Node installed on your development environment! At the time of writing, you will need Node version 0.10.26 for the Spark npm module to work. If you have a later version of Node installed, you can set up multiple versions of Node to run using the Node manager "n":
    1. Run `npm install -g n` to install the Node manager (this only works on Mac)
    2. Run `sudo n 0.10.26` in the folder with Clickr to install that version of Node.
2. Clone this git repo into your preferred folder for projects.
3. Open up your Terminal/Command Prompt and navigate into the folder you clones the project (super simple if you cloned via the command line, you're almost there already!).
4. Type in `npm install` (or if you are on Mac, I'd recommend `sudo npm install` as some of the dependencies may require admin priveleges). This command reads package.json and installs all of the required dependencies Clickr needs to run.
5. Type in `gulp serve` in the same folder to compile everything nicely and have it served to you in a web browser at localhost:3000.

## Target your own device!
At the moment, to target your own device you'll need to open up src/js/app.js and replace DEVICE_ID and ACCESS_TOKEN with your own ones.

## Issues with building the files but want to test?
Just run the files within the /public folder. Do a search for DEVICE_ID and ACCESS_TOKEN and update those two variables.

Go on. Run it. Click things. You know you want to.