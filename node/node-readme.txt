Running through some guides on node itself as the first step in learning about node.  This will be
my notes document, and I'll probably have some directories for mini-projects.

Getting Started Guide
https://nodejs.org/en/docs/guides/getting-started-guide/

They jump right in so lets start a directory for the first examples.  I'll call this 1-nodestart.

This first step is just cut and copy code from the site, to see what a node app looks like.

So that code apparently starts up a server, and serves out a plain text web page.
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

Everything in node is supposed to be an asynchronous task (I only say only because the node guides
I didn't go through yet, made it sound like this isn't always the case.)

In node, the event loop is something that offloads work from a single threaded JS environment into
system kernel threads.

Apparently there are two steps, as seen in the first guide, for writing a node app.  First we import
the http module using require, or ECMASCRIPT import (?) we create a server instance with 
createServer, which registers a callback function with a couple arguments, request and response.

That (req, res) => {} syntax is just setting up a callback, which you know about.

Apparently even that is asynchronous in node, and every time a connection comes in, this code will be
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

HTTP was obviously a Module to have node serve as a web server.  Up until now we've seen a lot of 
plain text reply examples, but you could also see text/html.  Also res.write apparently appends to
response body, and res.end writes, and ends the response body.  In our example we just used end
with the message we were going to send up.

the request has a url element, and that would be the url path after the site... so like 
www.google.com/whattheheck, would have url="/whattheheck"

the URL module has functions for splitting URLS for you.  This code reads things like they came from
a HTML get like thing it looks like:
    var http = require('http');
    var url = require('url');

    http.createServer(function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      var q = url.parse(req.url, true).query;
      var txt = q.year + " " + q.month;
      res.end(txt);
    }).listen(8080);

With that code, apparently this URL:
    http://localhost:8080/?year=2017&month=July

Would show:
    2017 July

The FS module lets node act like a file server.  You can do things like:
    fs.readFile()
    fs.appendFile()
    fs.open()
    fs.writeFile()
    fs.unlink()
    fs.rename()
    
The URL module does work on URLs.  For instance:
    url.parse() could take a url, http://localhost:8080/default.htm?year=2017&month=february
    and after doing a q = parse(url, true)
    you'd get this back:
        q.host = localhost:8080
        q.pathname = /default.htm
        q.search = ?year=2017&month=february
        q.query = { year: 2017, month: 'february' }

So now we play with those two modules, by putting them together.
In 2-fileandurl we set up a node http server that checks the url path, to serve up two separate html
files depending on path.  I bet this is pretty similar stuff to things that express abstracts away 
for us, but maybe I am getting ahead of myself.

You can download node packages with the node package manager (npm), and after you download them, 
require them like normal node packages.

Node has events, much like what happens in js in the browser.  So like for instance, you can add an
event handler to the readStream object in fs.  It looks something like this:
    var fs = require('fs');
    var rs = fs.createReadStream('./demofile.txt');
    rs.on('open', function () {
      console.log('The file is open');
    });

If you want to make your own events, you can require the package "events" and do something like
this:
    var events = require('events');
    var eventEmitter = new events.EventEmitter();

    //Create an event handler:
    var myEventHandler = function () {
      console.log('I hear a scream!');
    }

    //Assign the event handler to an event:
    eventEmitter.on('scream', myEventHandler);

    //Fire the 'scream' event:
    eventEmitter.emit('scream');
    
There are a couple of modules that are good for handling file uploads and emails this tutorial talks
about:
    formidable - this module will have to be downloaded with the npm, and then is there for use.
                 we're stealing an example from the guide to see how this is used.
    nodemailer - also needs to be downloaded with npm.  This handles mails.

Note: I don't know if I am doing the npm stuff right.  I can use the modules but I have to do the
install into the directory of the project, and not in the computer...  The guide makes it sound like
I should be able to npm once and use it everywhere I want... but this doesn't seem to be the case.
    
First formidable: 3-upload
    Following the guide we created a page that works on the pathless page.  Then when we submit a 
    a file, we reroute the request and actually take the file using formidable and place it in our 
    directory.  Seems to error if we submit with no file thought.

Now nodemailer: 4-mailer
    I'm not going to actually do this test because it wants me to drop the password of a e-mail
    account in, and I don't want to set up a gitignore and such to hide all that.  It looks
    straightforward enough.
    
    Basically it works like this:
        var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'youremail@gmail.com',
            pass: 'yourpassword'
          }
        });

        var mailOptions = {
          from: 'youremail@gmail.com',
          to: 'myfriend@yahoo.com',
          subject: 'Sending Email using Node.js',
          text: 'That was easy!'
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        
    You can also send HTML by just sending that as "html" instead of "text", and send to multiple
    by comma separation in the to line.
    
That's it for this tutorial, but I think I'm going to come back when I know more about MongoDB.  And
do this part: 
https://www.w3schools.com/nodejs/nodejs_mongodb.asp

But not yet.

Now I'm going to watch this youtube video and make a few notes if I feel like I learn something:
https://youtu.be/pU9Q6oiQNd0

Not much here so I assume that I'm nearing the end of my introduction to node.js.  I know you can
get deeper, but most of the entry level tutorials talk about how to use modules and how to start up
a web server.

The stuff that I remembered to write down from this is that if you create a module, you need to do 
able module.exports.blah = 1; to set up an object that is sent to anything using your module.

Or you can overwrite module.exports with a function that is called when the module is run:
    var mod = require("./mymod");
    mod();

This dude likes something called underscore, I should figure out what that is.  He also mentioned
backbone.

The other thing I learned here is that modules DO install only in your project. You can do a npm 
init drop a little package.json that lists dependencies. This list lets you not ship the additional 
modules,  and when the user is installing your stuff, the npm install command will go get those 
modules and versions for you without having the user go do installs of thos projects.  You can do a
npm install blah -s to install and add to the package.json... or you can add it manually.  I might
have all that wrong but I think it mostly is right, and would come quick when I start using it, 
_if_ I have the need to create a shippable module.

So I think that is it for now.  I can come back to dig deeper, but that should be enough to be
dangerous and continue on to express.js.


