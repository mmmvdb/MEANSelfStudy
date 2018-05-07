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

If the current function doesn't end the req/res cycle, then it has to call next().

This looks pretty similar to some stuff we've already done, but I'll do it in a miniproject for
practice.  I'll call the folder middleware and do this without using the express-generator.

Okay so some fun things I think I learned from this.  This way of handling middle ware makes those
functions be called no matter the request that comes in.  The method we used before, where we have
multiple functions in the same routing handler, would only happen for that routing.

These functions can be useful for messing with the request, or doing some prevalidation before 
actually handling it.  Or some other things I'm sure.

They go further to say that you can set up a module that takes parameters in a function then returns
the function based on those params, so you can make the module configurable.  They say you can check
out cookie-session and compression for examples of modules that do this.

