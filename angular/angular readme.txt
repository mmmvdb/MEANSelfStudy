Angular is a JavaScript framework.  It extends HTML attributes with directives and binds data to 
html with expressions.

It extends html with ng-directives.
    ng-app directive to define a angularjs application.
    ng-model directive to bind the value of HTML controls (input, select, textarea etc.) to 
        app-data.
    ng-bind directive to bind application to the HTML view.
    ng-init directive initializes angular variables.
    
(these can be data-ng prefixed if you want to pass HTML validation.)

Expressions are written inside {{}} double braces.  Those bind data the same way as ng-bind.

Applications
    Modules define applications.
        var app = angular.module('myApp', []);
    Controllers control applications.
        app.controller('myCtrl', function($scope) {
            $scope.firstName= "John";
            $scope.lastName= "Doe";
        });
    
    ng-app defines the application
    ng-controller defines the controller
    
Expressions
    Expressions can be written inside of braces as described above {{ }}
    
    They can also be written inside a directive: ng-bind="expression"
    
    Angular resolves the expresson and binds it.
    
    Expressions are like JS expressions, they can only contain literals, operators and variables.
    
    Here is the first example woo!
    
        <!DOCTYPE html>
        <html>
            <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js">
            </script>
        <body>
            <p>Change the value of the input field:</p>

            <div ng-app="" ng-init="myCol='lightblue'">
                <input style="background-color:{{myCol}}" ng-model="myCol">
            </div>

            <p>AngularJS resolves the expression and returns the result.</p>

            <p>The background color of the input box will be whatever you write in the input field.
            </p>

        </body>
        
        </html>

    This example takes the value entered in the input and tries to use it as a color.

    Apparently using ng-init is not very common.  There is a better way coming up.
    
    With expressions basically everything is the same as JS.
    
Modules
    An angular module defines an application.  It is also a container for different parts of an 
    application, and the controllers which always belong to a module
    
    Creating a module is created by the angular function angular.module:
        <HTML>
            <div ng-app="myApp"></div>
        
        <JS>
            var app = angular.module("myApp", []);
    
    The myApp refers to an HTML element where the application will run.
    
    Now you can add all the goodies to the application.
    
    Adding a controller:
        <div ng-app="myApp" ng-controller="myCtrl">
            {{ firstName + " " + lastName }}
        </div>

        <script>

        var app = angular.module("myApp", []);

        app.controller("myCtrl", function($scope) {
            $scope.firstName = "John";
            $scope.lastName = "Doe";
        });

        </script>
    
    Basically you just add the controller with the ng-controller.
    
    Adding a directive: 
        <div ng-app="myApp" w3-test-directive></div>

        <script> 
        var app = angular.module("myApp", []);

        app.directive("w3TestDirective", function() {
            return {
                template : "I was made in a directive constructor!"
            };
        });
        </script>
    
    Usually the module and the controllers are in JS files rather than script tags of course.
    
    (When you are defining the module using angular.module("myApp", []); the [] is used to define
     dependeny modules.  Without the [] module it doesn't create a module but retrieves one)
     
    (While it is pretty common to load your scripts after the HTML is basically done, you should
     load the angular library in the head or start of the body element because you need it in place
     to call angular functions)

Directives
    These are used to extend HTML. There are a set of built in directives that add functionality to
    your applications.  You can also define your own.
    
    ng-app ng-init ng-model are all directives.
    
    Now for some really good stuff.
    
    ng-repeat repeats an element (by cloning):
    <div ng-app="" ng-init="names=['Jani','Hege','Kai']">
      <ul>
        <li ng-repeat="x in names">
          {{ x }}
        </li>
      </ul>
    </div>
   Looking a little pythonic there.
   
   This also works on objects:
   <div ng-app="" ng-init="names=[
    {name:'Jani',country:'Norway'},
    {name:'Hege',country:'Sweden'},
    {name:'Kai',country:'Denmark'}]">

    <ul>
      <li ng-repeat="x in names">
        {{ x.name + ', ' + x.country }}
      </li>
    </ul>

    </div>
   
    Which they point out is awesome for CRUD.  These objects can be coming from the database.
     
    ng-app auto bootstraps the application (auto intializing).
    
    ng-init defines initial values, but usually you'll use a controller or module instead
    
    ng-model again binds a value to an HTML control.  But it can also provide type validation
    (number, email, required), provide status for app data (invalid, dirty, touched, error),
    provide css classes, bind html elements to forms.
    
    To create your own directives, you use app.directive.  Then to use it you just use the directive
    name in a HTML tag: 
    
    <body ng-app="myApp">

    <w3-test-directive></w3-test-directive>

    <script>
    var app = angular.module("myApp", []);
    app.directive("w3TestDirective", function() {
        return {
            template : "<h1>Made by a directive!</h1>"
        };
    });
    </script>

    </body>
    
    You can use it as an element name, an attribute, a class, or a comment and they all act the same
    
    This can be restricted by adding a restrict property:
    var app = angular.module("myApp", []);
    app.directive("w3TestDirective", function() {
        return {
            restrict : "A",
            template : "<h1>Made by a directive!</h1>"
        };
    });
    
    Restrict values are:
        E for Element name
        A for Attribute
        C for Class
        M for Comment
    The default the value is EA