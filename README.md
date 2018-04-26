# MEANSelfStudy
Just a little playground as I learn and tryout the MEAN stack

Just some info about what I downloaded for this experiment.  And some intro notes.

I'm using a freshly updated git for keeping this on github:
git version 2.16.2.windows.1

MEAN stands for

mongodb (3.6.4)
    - Backend nosql database.  JS like apparently.
      Not sure what the advantage of nosql over relational is yet.  It seems like some think
      it is better performance since related data is stored together.  I guess we'll learn.
    - Install notes.  It seems like I installed it correctly, even without the windows server 2018 
      stuff I'm supposed to. I guess that means that I had it, or something has changed.
      I need to read through these steps: 
          https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
      After the steps to check to see if I can start the server "mongod.exe" and client
      "mongo.exe", which I checked, I need to see if I really need a windows service, and possibly
      setting path information to make my life easier.
      
express.js
    - An extention for node.js which I'll be learning for the first time.
      Apparently it is a node.js module that helps with web/mobile applications.
      Some things like payload parsing, cookies, url routing, session control, are all handled
      by this modual.  With naked node.js, all that stuff would have to be reimplemented each 
      project.
    - Install notes.  Apparently this isn't anything that you install directly... it is just a 
      node module. So there are steps when you have an application to include it in your project.
      So I guess I'll be learning more about that when I learn more about node.js.  But here is a 
      high level of what I found:
          - Creating a project in node involves a npm init, in the project directory that you
            intend to work with.
          - After doing this, you can npm install express --save to add it to the dependencies of 
            your project.  --no-save adds it temporarilly and doesn't include it in the dependencies

angular.js
    - The frontend.  I've played with this a bit, not much, so this will be learning for me too.
      I think the idea here is to extend HTML a bit, to make it make more sense for coding...
      reuse of sections, and such, code separation... things like that I think.
    - Install notes.  Again, this isn't like a normal thing that is installed.  You can add it to 
      a project using the node package manager.  I'll learn more about this when I go through the 
      angular tutoral.

node.js (8.11.1)
    - This is the backend.  I assume it is a bit of a middleware, API style thing... could be wrong.
      I know it is the guy that works sort of like a webserver, and will host a site, and collect
      request and return replies.
    - Install notes, I think I played with this a very little bit, and had it installed, and a 
      path logical set up for it.  I updated it for this experiment though.


Keep in mind that this is a cold call summary of all this with minimal research.

The idea of the project is that I know little of this, and really only have a handle of JS and 
jQuery.  It would be nice to branch out and learn some stuff about things like this.  A mean stack
also seems like it would be good for quick proof of concepts, and startup style projects, which 
would be nice to get into, especially since I have the intention to try and find hackathons and such
since they seem like so much fun.