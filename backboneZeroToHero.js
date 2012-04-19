// Backbone Zero to Hero
//----------------------
// The purpose of this small project is to present some foundational concepts
// of JavaScript and work right up into Backbone.js one of the most popular MV*
// frameworks around these days.

// Types
//------
// In JS there are objects, dates, arrays, strings, numbers, regexp, and functions as built in types.
// Each of these types has an underlying [Prototype](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/prototype).
// The prototype is what defines each type's properties and methods. 
// Below is a breakdown of each JS object type.

console.log('---------------- Object Types ----------------');

// ### [Object](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object)
// The most basic JavaScript type.  
// Also can be used by...
//
//     var myObject = new Object();
//
// Though most prefer the more terse, `{}`  
var myObject = {};
console.log(typeof myObject); // result: object

// ### [Date](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date)
// Dates are kind of strange. You'll note when logging typeof myDate
// that it will merely say **object** instead of Date. That's because
// the date is a **type** of object. Fortunately, to see if an object is
// a date you can use a native JavaScript function `toString` to help print out a
// more specific type, then test the result to see if it's a date.
//
//    toString.call(new Date());
//
var myDate = new Date();
console.log(typeof myDate, toString.call(myDate)); // result: object, [object Date]

// ### [Array](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array)
// An array in JavaScript. This does something similar to the date when calling toString.
// Can also be called with...
//
//     var foods = new Array();
//
// But again, most choose just to use the `[]`.
var myArray = [];
console.log(typeof myArray, toString.call(myArray)); // result: object, [object Array]

// ### [String](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String)
// This is a basic string in JavaScript.  
var myString = 'Hello world';
console.log(typeof myString); // result: string

// ### [Number](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Number)
// This is a number in JavaScript and by default is a floating point number in memory.
var myNumber = 12345;
console.log(typeof myNumber); // result: number

// ### [Boolean](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Boolean)
// This is a boolean type.
console.log(typeof true); // result: boolean

// ### [Function](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function)
// Functions in JavaScript are how you get things done. There are two ways to define them.  
// First is this way below. Notice you DO NOT need a semicolon after this type of function.
// When defining a function in this way, it is available anywhere throughout the application.
// This means you can use it before it's actually even defined.
console.log(typeof doFunctionyThings); // result: function
function doFunctionyThings(){} 

// This is the other way of defining functions. Basically it just assigns the function to a variable.
console.log(typeof User); // result: undefined (Because this one is defined as a variable)
var User = function(name){
    this.name = name;  // The user is given a property of name.
};
console.log(typeof User); // result: function

// Another way to use functions in JavaScript is with the **new** keyword. This creates an instance of a User.
var hero = new User("Boba Fett");
console.log(typeof hero, toString.call(hero), hero.name); // result: object, [object Object], Boba Fett

// You can use the `instanceof` keyword to determine if a variable is a type of a certain constructor.
// Here I am checking to make sure that the user I created is actually an instance of the User constructor.
console.log(hero instanceof User);

// ## Prorotype
// JavaScript is a dynamic language. There is no such thing as a 'class' in the classical OO sense of C#, or Java.
// Class behavior CAN however be emulated using the function's **prototype** along with certain design patterns.
console.log('---------------- Prototype ----------------');

// This will become clear shortly, just hang in there!
var Tower = _.extend({}, Backbone.Events);

// We are going to define an Airplane "class" if you will. Again, not REALLY a class, but you can kind of think of it like that.
var Airplane = function(airline, number){
    this.number = number;
    this.airline = airline;
    this.fuelTank = 0;
    
    // Again, we'll get to this...
    Tower.on('clear-for-landing', this.land, this);
};

// Notice the use of `this` here. In JavaScript `this` is a keyword. It is *similar* to C#, or Java, but it can get a little bit tricky.
// `this` refers to the **caller** of the function. Most of the time when using it like below in this fuel method you won't run into issues.
// It will simply refer to the instance of the Airplane you are defining. So since fuelTank is defined in the Airplane's constructor,
// it is available throughout the Airplane's prototype.
Airplane.prototype.fuel = function(amount){
    this.fuelTank = amount;
    // Return this to allow for chaining
    return this;
};

Airplane.prototype.fly = function(){
    console.log('Flying is fun...');
    this.fuelTank -= 20;
    return this;
};

Airplane.prototype.land = function(flight){
    if(flight === this.number){
         console.log('wheels down skid skid landed ' + this.number);
    }
    return this;
};

// Something interesting to note is that you can also define functions inside of a constructor like...
//
//     var Airplane = function(){
//         this.fuel = function() { // Do stuff... }
//     };
//
// However, performance and re-usability are at stake here.  
// Defining functions like this inside of constructors get re-created every time you use them.  
// http://jsperf.com/prototype-vs-instance-functions  
// Also, using the prototype makes the functions available on every single instance of the function without
// having to re-create it. 

// ### Inheritance
// Most OO languages have a concept of inheritance. Basically creating a new class with another class as it's base.
// In JavaScript, class inheritance is *sorta* possible using the prototype.
//
// Every single function or class can be executed using [call](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/call) 
// and [apply](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/apply).
// When using call and apply, the first arugment passed in is *context* you want inside the function call. Or in other words, it defines
// what `this` means when calling a the function. The main difference between call and apply is that using call you can pass in
// each argument in order, and in apply you pass in an array of arguments.
// 
var doSomething = function(x,y) { 
    return x + y + this.z; 
};
console.log(doSomething.call({ z: 7 }, 1, 3));
console.log(doSomething.apply({ z: 7 }, [1, 3]));

// Now for the inheritance part. You can create a Boeing747 which inherits from an Airplane like...
// Also, note the `arguments` below. Even though there isn't `(name, number)` like in the Airplane constructor,
// arguments is automatically assigned and given ALL of the incoming arguments as an array. Then the arguments can 
// be passed to the Airplane constructor, and applied to the Boeing747 constructor. Effectively calling `new Airplane('southwest', 1234);`
var Boeing747 = function(){
    Airplane.apply(this, arguments); 
    console.log('747' + this.number);
};

// We'll cover in detail shortly, but it basically takes two things and squishes them together. This ensures that all of the functions
// of an airplane are also available on the Boeing747.
_.extend(Boeing747.prototype, Airplane.prototype);

var plane = new Boeing747('southwest', 1234);
plane.fuel(50)
    .fly() // result: Flying is fun... 
    .land(1234); // result: 
    
console.log(plane.fuelTank); // result: 30

// ###Extend
// Extend is a very common concept in JavaScript. You can do it in jQuery with $.extend, or underscore with _.extend.
// Effectively it takes multiple objects and combines them all into one object.
var objectA = {
    someProp: 'foo',
    someFunc: function(){
        return 'bar';
    }
};

var objectB = {
    anotherProp: 'my goodness!',
    anotherFunc: function(){
        return 'extendedness';
    },
    someProp: 'badabing'
};

var extendedObj = _.extend({}, objectA, objectB /* This can go on and on and on */);
console.log(extendedObj); // result: an object that has all of the functions of objectA AND objectB

// ###Anonymous functions

// What about private stuff like in C# and Java?
// That's where the patterns come in...
// We will utilize a concept called a **self executing anonymous function** and **closures**.

console.log('---------------- Closure ----------------');
var closureDemo = function(){
    var x = 1,
        y = 2;
    
    var doSomething = function(){
        var a = 2,
            b = 3
            result = 0;
        
        var anotherSomething = function(){
            return a + b + x + y;
        };
        
        result = anotherSomething();
        return result;
    };
    
    // I can still use x and Y, just not a and b.
    return {
        doSomething: doSomething
    };
// The `()` on the end here causes the function to automatically fire. Whatever is returned get's assigned to the variable.
}(); 

console.log(closureDemo.doSomething()); // result: 8

// Here all of these variables were declared inside of the anonymous function, so therefore they are out of memory now. So if I tried...
//
//     console.log(x,y,a,b,result);  // result: ALL UNDEFINED!
// 
// The browser would throw errors.  


// ###Revealing Module Pattern
// This pattern is a way of defining classes using anonymous functions.
console.log('---------------- Revealing Module ----------------');
var myRevealingModuleClass = (function(){
    var revealed = false;
    
    var privateFunction = function(){
        revealed = true;
    };
    
    var publicFunction = function(){
        privateFunction();
        return revealed;
    };
    
    return {
        foo: publicFunction
    };
}());

console.log(myRevealingModuleClass.foo());

console.log('---------------- Revealing Prototype ----------------');
// Now the revealing PROTOTYPE pattern... Similar concept as module
var myRevealingPrototypeClass = function(){};

myRevealingPrototypeClass.prototype = (function(){
    var revealed = false;
    
    var privateFunction = function(){
        revealed = true;
    };
    
    var publicFunction = function(){
        privateFunction();
        return revealed;
    };
    
    return {
        foo: publicFunction
    };
}());

console.log(myRevealingPrototypeClass.foo); // Can't use foo here! Have to use an instance of the class to get to it.
console.log(new myRevealingPrototypeClass().foo());

// ##jQuery
// jQuery is a DOM manipulation tool. It takes care of many of the cross browser concerns involved with it.  You can replace browser functions like...
//
//     var elements = document.getElementsByClassName('someClass'); // Replace this...
//     var els = $('.someClass'); // With this...
//
// jQuery is NOT a framework, it's a tool and only has one job (And it's damn good at it).  
//
// One problem though with jQuery is people inevitably end up writing code that looks like this...(spaghetti code!)
$(function(){
    $('.myClass').click(function(){
        console.log('click');
    });
    $('.myOtherClass').click(function(){
        console.log('click');
    });
    
    $('.this .crazy div:first').mouseover(function(){
        var value = $('.myClass').text();
        console.log('This stuff all works great...');
    });
    
    $('.myClass').mouseover(function(){
        console.log('oops I forgot this one!');
    });
});

// Instead adopt some of these practices. 
// Cache your selectors, and define callback functions if needed.
// This speeds up DOM queries since they are expensive!
$(function(){
    var myClass = $('.myClass'),
        myOtherClass = $('.myOtherClass'),
        crazyClass = $('.silly .crazy div:first');
        
    var doCommonStuff = function(){
        console.log('click');
    };
    
    myClass.click(doCommonStuff)
        .mouseover(function(){
             console.log('oops I forgot this one!');
        });
    
    // Note in jQuery 1.7 this is also accepted
    myOtherClass.on('click', doCommonStuff);
    
    crazyClass.click(function(){
        var value = myClass.text();
        console.log('click');
    });
});

// Step 3. Events
// Things like click, mouseover, blur, etc. are all browser events
// $('selector').click() or $('selector').on('click');
// Also there are custom events.
// One event pattern is called pub/sub.
// This pattern has publishers(trigger) and subscribers(bind)
// Just like the browser, it publishes a click event, and the dom elements listen for the event.

console.log('---------------- Events ----------------');
// Extend the pub/sub of Backbone into an annonymous object
// Use the 'mediator pattern' and define ONE object to handle ALL events
var Vent = _.extend({}, Backbone.Events);

Vent.bind('my-custom-event', function(a,b,c){
    console.log(a + b + c);
});

Vent.trigger('my-custom-event', 1, 2, 3);

// So, think about this as an airport...

var southwest1457 = new Airplane('southwest', 1457);
var southwest254 = new Airplane('southwest', 254);
var southwest567 = new Airplane('southwest', 567);            

Tower.trigger('clear-for-landing', 1457);
Tower.trigger('clear-for-landing', 254);
Tower.trigger('clear-for-landing', 567);


// Movie List
// 1. Create Models and Collection
// 2. Create Views
// 3. Utilize handlbars
// 4. Create Router
var moviesJson = [{
    id: 1,
    name: 'Star Wars',
    rating: 'PG',
    description: 'Best ever'
},
{
    id: 2,
    name: 'The Matrix',
    rating: 'R',
    description: 'Also good...'
},    
{
    id: 3,
    name: 'Saving Private Ryan',
    rating: 'R',
    description: 'Arguably best war movie ever'
}];
    
$.mockjax({
    url: 'movies/',
    responseText: moviesJson
});
// Step 1.
// Models represent any form of data.
// They have built in functions for getting properties, 
// fetching data, saving data and many more. 
var Movie = Backbone.Model.extend({});

// Collections is just a set of models with all of the
// collections functions from _ (each, any, find)
var Movies = Backbone.Collection.extend({
    url: 'movies/',
    model: Movie
});

// Step 2.
var MoviesList = Backbone.View.extend({
    el: '#movies',
    initialize: function(){
        _.bindAll(this, 'renderOne');
        
        this.collection.on('reset', this.render, this);
        this.collection.on('add', this.renderOne, this);
        
        this.collection.fetch();
    },
    render: function(){
        var self = this;
        
        this.collection.each(this.renderOne);
        
        return this;
    },
    renderOne: function(movie){
        var movieItem = new MovieItemView({ model: movie});
        movieItem.render();
        
        this.$el.append(movieItem.el);
    },
    show: function(speed){
        this.$el.fadeIn(speed || 0);
    },
    hide: function(speed){
        this.$el.fadeOut(speed || 0);
    }
});

var MovieItemView = Backbone.View.extend({
    tagName: 'tr',
    events: {
        'click': 'showDescription'
    },
    initialize: function(){
        this.template = Handlebars.compile($('#moviesTemplate').html());
        
        return this;
    },
    render: function(){
        var html = this.template(this.model.toJSON());
        this.$el.append(html);
        
        return this;
    },
    showDescription: function(event){
        Backbone.history.navigate('movies/' + this.model.get('id'), true);
        //alert(this.model.get('description'));
    }
});


var movies = new Movies();

var MovieRouter = Backbone.Router.extend({
    initialize: function(){
        this.moviesView = new MoviesList({
            collection: movies
        });
        this.movieView = $('#movie');
        
        Backbone.history.start();
    },
    routes: {
        '': 'main',
        'movies/:id': 'showOneMovie'
    },
    main: function(){
        this.movieView.html('');
        this.moviesView.show('slow');
    },
    showOneMovie: function(id){
        var self = this,
            movie = movies.find(function(movie){
            return movie.get('id') == id;
        });
        
        if(movie){
            this.moviesView.hide();                
            this.movieView.hide()
                .html(movie.get('description'))
                .fadeIn('slow');
        }
    }
});

$(function(){
    var router = new MovieRouter();
});


// Namespace
// To eliminate the cloggin of the window... Use Namespaces!

// Just in case NS is already defined... Do this
var NS = NS || {};

NS.Models = NS.Models || {};

NS.Models.Movie = Movie;