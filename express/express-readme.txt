Running through some guides on express itself as the first step in learning about express.  This 
will be my notes document, and I'll probably have some directories for mini-projects.

Luckily I think it looks like the express website has a bit more learning content than node did,
or maybe it was just aimed more at a beginner like me.

So right off the bat, I think I'll run though the guides I am finding here:
https://expressjs.com/

First with their getting started/installing guide.

They say it works like this:
    Make a directory for your project.
    
    Do the npm init that we learned about in the node exploration.  Default prompts are fine, but 
    you should name the js something that is meaningful to the project and not just index.js.
    
    After doing this, you can do an npm install express --save, to install express into the project
    and add it to your project dependencies.  Or a --no-save to just temporarily use express.
    
So now on to a simple hello world project.  This doesn't do much more than what node does,but that
is because this is a simple project that doesn't create a full express app, with the express 
generator. I'll put this in a new directory called helloworld.

    So first I did the npm init, calling the js helloworld.js
    
    Then I did the npm install express --save.
    
    And holy crap did it install a lot of packages.
    
    Now we modify helloworld.js to do the simple example.
    
    And that works.

I think what they are telling me about this project is express stole the normal handling of server
creation and the listening from node, probably to change a bit of what it does and abstract it away.
Hopefully I'll be learning more about what that does for me in the next guides they have.

Now for the express application generator.

I don't know much of what I am doing, so I'll just make some notes and then try it in a folder 
called appgen.

The express-generator is a different package.  So we have to install it as well, and they suggest
this command:
    npm install express-generator -g

The -g apparently does something global, although I'm not sure if that is installing the node folder
or the project so we'll have to test that.  (I just did and it dropped no packages so I assume this
is what it is doing)

They suggest doing an express -h to get a help of the options we have.  It looks like we can do something
things like change the view engine, the CSS engine, not that I know much about that yet.

For this mini project we are going to create a project called myapp, and use the pug view engine:
    express --view=pug myapp

I guess I could have done that from a directory a bit lower.  This took the liberty of creating a 
project directory for us.

It also created a whole directory structure and dumped how this help text:
   change directory:
     > cd myapp

   install dependencies:
     > npm install

   run the app:
     > SET DEBUG=myapp:* & npm start

So we'll install the dependencies.

And it is telling me that we can even go ahead and run the project with that command and check out
localhost:3000/ so lets do that too!

Hey a mini express page is served up.  I guess that is nice.

They have a bit of info and no project in the next guide.  They talk about routing.  Straight from
the express object, you can access .get .put .delete .post, all the common http requests.  And 
actually even the uncommon ones.  The param you send is the url path that you'd like to catch the
request from.  So just like we've been doing up until now "/" is the root path, but you could catch
things like "/user" to catch.  

You can use string patterns in this param, or you can use regex, or just text.  Examples:
    ;Match site.com/about
    app.get('/about', function (req, res) {
      res.send('about')
    })

    ;Match site.com/abcd and /acd
    app.get('/ab?cd', function (req, res) {
      res.send('ab?cd')
    })

    ;Match anything ending with a "fly"
    app.get(/.*fly$/, function (req, res) {
      res.send('/.*fly$/')
    })

You can collect params:
    Route path: /users/:userId/books/:bookId
    Request URL: http://localhost:3000/users/34/books/8989
    req.params: { "userId": "34", "bookId": "8989" }
    
    app.get('/users/:userId/books/:bookId', function (req, res) {
      res.send(req.params)
    })
    
You can do param tricks (. and - are treated as literals):
    Route path: /flights/:from-:to
    Request URL: http://localhost:3000/flights/LAX-SFO
    req.params: { "from": "LAX", "to": "SFO" }
    
    Route path: /plantae/:genus.:species
    Request URL: http://localhost:3000/plantae/Prunus.persica
    req.params: { "genus": "Prunus", "species": "persica" }
    
You can do regex to validate the params you accept:
    Route path: /user/:userId(\d+)
    Request URL: http://localhost:3000/user/42
    req.params: {"userId": "42"}

Im not sure the use of this yet, but when you specify a function to handle a specific route, you can
actually also specify multiple functions, or an array of functions or both.  When you do this the 
first functions should also take a next param, and you can invoke the next function to handle the
route by calling next() in the current function.

Maybe this can be used to do things like catch unlogged in users and reroute to the login page if 
necessary.  Not sure.  I'm sure I'll be introduced to common patterns that use this stuff.

There are a bunch of response methods you can use (but your route handlers should always use one or
the requests will hang):
    res.download()
    res.end()
    res.json()
    res.jsonp()
    res.redirect()
    res.render()
    res.send()
    res.sendFile()
    res.sendStatus()
    
You can chain routes to reduce some code:
    app.route('/book')
      .get(function (req, res) {
        res.send('Get a random book')
      })
      .post(function (req, res) {
        res.send('Add a book')
      })
      .put(function (req, res) {
        res.send('Update the book')
      })
      
They were trying to explain routers here as well, but I didn't quite get it.  I think they were
saying that you can have a JS file use router to sort of store some routing in a JS, that then can
be included in other parts of your project.  They called it a mini-app.  It sets up some routings 
and middle ware, then you can pull in that as a module:
    Setup:
        var express = require('express')
        var router = express.Router()

        // middleware that is specific to this router
        router.use(function timeLog (req, res, next) {
          console.log('Time: ', Date.now())
          next()
        })
        // define the home page route
        router.get('/', function (req, res) {
          res.send('Birds home page')
        })
        // define the about route
        router.get('/about', function (req, res) {
          res.send('About birds')
        })

            module.exports = router
    
    use:
        var birds = require('./birds')

        // ...

        app.use('/birds', birds)
        
You can serve up static files using the express.static(root, [options]) built in.  I'll have to look
into this later.

Now for the goodies.  I've already looked at routing above, so next up is writing middleware.

Middleware functions are functions that get the request and response object, and the next function.
Middleware functions can execute any code, change the request and response objects, end the request
response cycle, call the next middleware object in the stack.

If the current function doesn't end the req/res cycle, then it has to call next().   Otherwise the
request will hang.

This looks pretty similar to some stuff we've already done, but I'll do it in a miniproject for
practice.  I'll call the folder middleware and do this without using the express-generator.

Okay so some fun things I think I learned from this.  This way of handling middle ware makes those
functions be called no matter the request that comes in.  The method we used before, where we have
multiple functions in the same routing handler, would only happen for that route.

These functions can be useful for messing with the request, or doing some prevalidation before 
actually handling it.  Or some other things I'm sure.

They go further to say that you can set up a module that takes parameters in a function then returns
the function based on those params, so you can make the module configurable.  They say you can check
out cookie-session and compression for examples of modules that do this.

Apparently express is a routing and middleware framework with minimal functionality besides that.
And express application is a collection of middleware calls.

There are several types of middleware in express:
    Application-level
    Router-level
    Error-handling
    Built-in
    Third-party

APPLICATION LEVEL
You can create application level middleware by binding it to the app object itself, like we did in
the last miniproject.  You can use app.use() to handle any request coming in, or use the 
app.METHOD() functions to handle specific HTTP requests like earlier projects.

You don't even have to have a mount path (route I'm guessing?), but you can supply one as the first
param.  And the rules for having multiple functions, an array of functions, or a mix of both apply
here (but you need to deal with the next unless one of your guys ends the request, and if one does,
the ones after it will not run).

You can add the middleware in multiple calls, they would work like you had them in the same array/
function list.

If one of your middleware functions decides to end a router middleware stake, you can call 
next('route') to pass the control over to the next route.  But this only works for app.METHOD or
router.METHOD functions.

ROUTER LEVEL
This works the same as the above, except it is bound to a router instance.

In this case to skip the rest of the routers's middleware, you would call next('router')


ERROR HANDLING LEVEL
These are defined the same way as the other middleware functions but they have three parameters
instead of the three: (err, req, res, next).  We'll go over this more in the error handling part of
the guide I'm going through.

BUILT-IN LEVEL
There are a few built-ins that you can use, you'd have to look a the documentation.  But here is 
the list (there used to be more but they removed some and made the separate modules a few releases
ago)
    express.static     - Serves static files such as HTML, images etc.
    express.json       - Parses through JSON in request payloads
    express.urlencoded - parses requests that have a url-encoded payload (not sure what that is)
    
THIRD PARTY LEVEL
This is modules that you can consume to add functionality to express.  They have an example here
of cookie-parser, that you can npm install, then require() in your program.  They then just do a
app.use() on it and that is that.  I wonder if it is that easy.  Probably depends on the module.

And on to template engines.

Template engines take a static template file, and at runtime replace variables in the template with
actual files.  In the end this builds a html file to send to the client.  This is done to make 
designing the HTML page easier.

There are tons of popular template engines: Pug, Mustache, EJS.  Express uses Jade as a default, 
but it supports many others.

In order to render template files, you need to set up some application settings, usually in app.js.
views - the directory where the template files are stored. app.set('views', './views')
view engine - the template engine to use. app.set('view engine', 'pug')

You need to make sure the template engine npm package is installed as well.  npm install pug --save

After doing this, you don't need to specify the engine or load the template module in the app, 
express does this for you.

Now we move on to our simple example:
We'll use pug for this.  So I'll create a new directory to store this project called templateengine.

I had to do some relearing there.  I did this by using the express generator and specifying the
template engine for pug:
express --view=pug myapp

and it already put pug as a dependency.

   change directory:
     > cd myapp

   install dependencies:
     > npm install

   run the app:
     > SET DEBUG=myapp:* & npm start

So we'll just do the install to make sure things are good.

So the next steps in the example are to create a file named index.pug in the view directory created.
That is straightforward enough.

Apparently if pug is set up as the view engine we can ignore the extention in the below.  Now they
want us to set up a route to render using the view engine.  They don't really specify where, but
if I am reading code right, app.js wants to send '/' routes to ./routes/index.  We'll make our
change there and see how that works.

It already had a route set up there, so we rewrote it with:
    /* GET home page. */
    router.get('/', function(req, res, next) {
      res.render('index', { title: 'Hey' , message: 'Hello there!'});
    });

And now we run and see if that worked:
    SET DEBUG=myapp:* & npm start
    
It totally did.  Awesome sauce.

Error handling next

Express comes with a default error handler.  Errors in synchronous code are caught by express and 
processed with no extra work.  You can test this by throwing an error in a route.  I'll do this in 
the work we just did in the view engine stuff.  Yep, it shows a trace.

Errors in asynchronous code like route handlers (weird didn't this just work for me?) and middleware
must be passed to the next() function.  They are caught by Express there and handled.  Ex:
app.get("/", function (req, res, next) {
  fs.readFile("/file-does-not-exist", function (err, data) {
    if (err) {
      next(err); // Pass errors to Express.
    }
    else {
      res.send(data);
    }
  });
});

They do some trick with callbacks in a sequence, if they don't provide any data, they can send
next as the callback. In the happy case, next is called and you go to the next script in the
sequence.  Otherwise the error is sent to next and it gets handled:
app.get("/", [
  function (req, res, next) {
    fs.writeFile("/inaccessible-path", "data", next);
  },
  function (req, res) {
    res.send("OK");
  }
]);

If code is invoked by route handlers or middlewhare, and they are asynchronous, you must catch
errors and pass to next:
app.get("/", function (req, res, next) {
  setTimeout(function () {
    try {
      throw new Error("BROKEN");
    }
    catch (err) {
      next(err);
    }
  }, 100);
});

Now they are talking about something called promises.  I've never heard of this before, so I'll have
to look into that.  Apparently they can be used in conjunction with error handling to handle both
rejected promises and errors both.  This can also avoid overhead of a full try catch block.

app.get("/", function (req, res, next) {
  Promise.resolve().then(function () {
    throw new Error("BROKEN");
  }).catch(next); // Errors will be passed to Express.
});

So looking into promises...
It sounds like promises are a way to handle problems with the event handling side of JS.  JS is
single threaded, so multiple threads can't be running through the code at the same time.  A way
around this, is to use event listeners and have them called back later.  However, problems arise
when events are attached to dom objects that might exist before the events are attached...
So you could go down a rabbit hole and check for if the object exists on the dom when the listener 
is set up and call the event blah blah.

Promises sort of abstract some of that away.  So you can set up a promise.  

A promise can be fulfilled, rejected (failed), pending, or settled (fulfilled or rejected).

Here is an example of a promise:
var promise = new Promise(function(resolve, reject) {
  // do a thing, possibly async, then…

  if (/* everything turned out fine */) {
    resolve("Stuff worked!");
  }
  else {
    reject(Error("It broke"));
  }
});

The constructor takes one argument a callback which has two params itself, a reject call back and a
fulfill callback. It is customary to reject with an error object.

Then to use the promise, you call the promise.then method.  It takes two functions, a success 
callback and a error callback.  Both are optional.

Well I guess that makes sense, but I doubt I have the full handle of it yet.
I can come back here to learn more: 
https://developers.google.com/web/fundamentals/primers/promises#whats-all-the-fuss-about

Well back to express.  Promises automattically catch both async and sync errors as well as rejected
promises.  So you just need to provide next as the final catch handler and errors will be caught by 
express.  The catch handler is given the error as the first argument.

You can also chain handlers to rely on synchronous error catching, reducing the asynchronous code.
Like this:
app.get("/", [
  function (req, res, next) {
    fs.readFile("/maybe-valid-file", "utf8", function (err, data) {
        res.locals.data = data;
        next(err);
    });
  },
  function (req, res) {
    res.locals.data = res.locals.data.split(",")[1];
    res.send(res.locals.data);
  }
]);

In this, if readFile errors, the error will be passed to express.  Otherwise we return to 
synchronous in the next handler and errors will be caught by express.  There was a risk if this was
all done in the readfile error handler that the error would cause an exit that would bypass express
error handling.

So, the default error handler that comes with express will handle errors by itself.  If you pass an
error to next, and you don't handle it in your own error handler, it defaults to express's and 
prints a stack trace.  If there is an environment variable NODE_ENV = production, the stack trace 
is suppressed.

If you call next with an error after you have started writing a response, ie an error occured while
streaming a response, the default error handler closes the connection and fails the request.
Because of this, when you ad a custom error handler, you want to delegate to the default error 
handling mechanisms in express:
function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
}

As talked about before, error handlers are made the same way as other middleware, but it takes four
arguments instead of 3 (err, req, res, next)

You define the error handling middleware last, after other app.use() and route calls.

Responses that come from the function can be an html error page, a simple message, or a json string.

For higher level framework purposes, you can have several error handling middleware functions.  
Like if you had a function just for XHR, you would have that function check for XHR, and sned the 
status and error, but not call next() stopping further processing.  The else case would call next,
sending us along to the next middleware function.  Makes sense.

If you pass anything to next() other than 'route', express assumes this is an error and will skip
any remaining non error middleware and routing.  If you want to handle that error message, you'd 
have to set up a error handling route for it.

Next up debugging.

I mean, you know what debugging is.  The good news is that the default debugger in express doesn't
have to be turned on or off, it reads that debug environment variable we talked about a bit back in
the section talking about error handling and how in debug you get a trace in debug mode.

You can see internal logs used in express by using express:* as the environment variable when
starting express:
> set DEBUG=express:* & node index.js (in windows)
$ DEBUG=express:* node index.js (otherwise)

You can also just see router implementation logs using express:router
and application level logs express:application 

Applications that are generated by express also use the debug module.  When they do this they use
a namespace.  If you generated an app like this: express sample-app, sample-app would be the 
namespace.
So calls to get to it's debugger would look like:
set DEBUG=sample-app:* node index.js
or DEBUG=sample-app:* node .bin/www

You can specify more than one namespace by comma separation:
set DEBUG=http,mail,express:* node index.js

And that is that.

Next in the guide is stuff about doing things behind proxies, which I think I can ignore for now.
I can learn about that if I need to use it for something, and I feel like I need to get to playing
around faster so I learn faster.

There are also some comments in the next two segments around upgrading to express 4 from 3, or to 5.
Again I'll skip those for now.

But the next section is about database integration.  And yeah!  We want to learn that.

Apparently express can support tons of databases.  Really it is just limited by the availability of 
a module to support it.
Some popular ones include cassanra couchbase couchdb leveldb mysql mongodb neo4j oracle postgresql
redis sql server sqlite and elasticsearch.

We'll ignore most of this except for mongo since we are planning on using that... but it would be
good to go back and learn some of this.  SQL dbs are where my background is, so it's sort of nice 
to see we don't just have nosql stuff.

They have an example of pulling in the mongoclient, and it looks like specifying a db and running a 
query.  Here is an example of that:
var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/animals', function (err, client) {
  if (err) throw err

  var db = client.db('animals')
  
  db.collection('mammals').find().toArray(function (err, result) {
    if (err) throw err

    console.log(result)
  })
})

They mention if you want to use an object model driver, you can take a look at mongoose, which I
think I will. They point us here: https://github.com/Automattic/mongoose

I think I'll come back to this later, I bet it is super useful for MEAN.

There are also some advanced topics in this guide I definitely want to come back to... around 
things like process managers (useful if I ever deploy something), security, performance, and 
such.  I definitely need to come back.  But now I get to learn about something completely new!

MongoDB.

