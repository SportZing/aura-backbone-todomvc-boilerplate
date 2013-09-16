aura-backbone-todomvc-boilerplate
=================================

## Requirements

[bower](http://bower.io/): run `npm install -g bower` if needed

[grunt-cli](http://gruntjs.com/getting-started): run `npm install -g grunt-cli` if needed

## Setup

Run `npm install`. This will automatically install bower components as well. If you do not have bower installed globally, you may see an error and need to also run `bower install`.

Run `grunt server`. This will start the express server and launch a page in the default browser that connects to the TodoMVC app.

Note that if you experience `EMFILE, too many open files` errors, you are liking running on OSX and need to increase your ulimit: `ulimit -n 10240`

## Features

This boilerplate configures the following:

* AuraJS project
* Backbone TodoMVC project
* Grunt-based build scripts
* Express servers for development and testing
* Live reload features
* Mocha test runner
* Bower support
* Compass/SASS support

## Background

The various AuraJS examples that I could find are in various states of disrepair. For instance, because the AuraJS API has changed recently, the TodoMVC example is currently broken. The live-reload features in the boilerplates I found didn't work properly.

I need to get a new backbone project started, but getting all the pieces to work together was proving difficult. So I worked out many of the issues and created this project.

I'm submitting a pull request to the aurajs/todomvc project to fix the API changes. Hopefully it will soon work again.

This boilerplate is not perfect, and there are still some improvements to be made. Contributions are welcome!

## Recognition

Thanks go out especially to Stephane Bellity & Addy Osmani.

Nothing in this project is new. I've just made various projects work together as best as I could in the short time I had available. 

