Running through some guides on node itself as the first step in learning about node.  This will be
my notes docuemnt, and I'll probably have some directories for mini-projects.

Getting Started Guide
https://nodejs.org/en/docs/guides/getting-started-guide/

They jump right in so lets start a directory for the first examples.  I'll call this 1-nodestart.

This first step is just cut and copy code from the site, to see what a node app looks like.

So that code apparently starts up a server, and serves out a plaintext webpage.
The code is straightforward enough:
    - We require 'http', I know nothing of this but assume that this is a node package/module.  
    - We set some variables to hold the host and port.
    - We end up creating an object that looks like it sets up a response, with a http code,
      header and content.
    - We create a listener to watch our port and host name and log out to the console when it
      starts.
    - One question I have on this is JS specific.  I've never seen ` used as a string delim and it
      looks like it behaves differently than ' or ".  If I used normal quotes, the var replacing
      didn't work like I would expect.  I tried to look into that, but didn't turn up much.  
      Googling for quotes is hard heh.
    - I also don't know what this => operator is, that is new to me.

I had to make all those assumptions myself.  The getting started guide on the node.js site didn't
really get into what the code did.  It just listed out a copy and paste statement.

So let's look for a different guide before continuing with the node.js guides.

Here is a weird other guide on reddit I found:
https://contextneutral.com/story/getting-started-with-nodejs-what-and-how/?utm_medium=reddit&utm_source=0&utm_campaign=rnode

Everything in node is supposed to be an asyncronous task (I only say only because the node guides
I didn't go through yet, made it sound like this isn't always the case.)

In node, the event loop is something that offloads work from a single threaded JS environment into
system kernal threads.

Apparently there are two steps, as seen in the first guide, for writing a node app.  First we import
the http module using require, or ECMASCRIPT import (?) we create a server instance with 
createServer, which registers a callback function with a couple arguments, request and response.

That (req, res) => {} syntax is just setting up a callback, which you know about.

Apparently even that is asyncronous in node, and every time a connection comes in, this code will be
ran.

It sounds like it is as easy as examining the req that comes in and sending back an appropriate res.

req is an object holding all the info about the request. Things like IP of the requesting client,
hostname, headers, body (JSON maybe), params, query strings.

res is the reply object.  You fill this out to send the response back to the client.  There are 
methods defined which you are supposed to fill out the object, in an effort to keep invalid 
responses to a minimum.

the server methodology of listening for connections, and dealing with them from a queue like 
situation happens here.  You can think of the listen function as the listener, and the createServer
function as the call back that is called for each connection when it is worked upon.  Listen can 
take 4 params, Port, hostname, backlog, and callback for the successful beginning of the listener.

So in our example in the first guide, we just printed to the console, when the listener started.

And thats it for that... so basically it confirms most of what I guessed from the first guide.

Ahhhh shit.  There is a w3schools guide.  I love these guys.  Lets see if they get more in depth for
me.
https://www.w3schools.com/nodejs/nodejs_get_started.asp

They have a handful of builtin modules, things like event handling, zipping, os information, 
clustering.  You can also define your own, you do that by using the exports keywork like this:
    exports.myDateTime = function () {
        return Date();
    };
Which returns a date object if you would call it ('I'm guessing a bit here but I bet I'm right'):
    var dt = require('./myfirstmodule');
    
    date = dt.myDateTime();

