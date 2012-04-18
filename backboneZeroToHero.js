// Backbone Zero to Hero
//----------------------
// The purpose of this small project is to present some foundational concepts
// of JavaScript and work right up into Backbone.js one of the most popular MV*
// frameworks around these days.

// Types
//------
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
// a date you can use a native JavaScript functino toString to help print out a
// more specific type, then test the result to see if it's a date.
//
//    toString.call(new Date());
//
var myDate = new Date();
console.log(typeof myDate, toString.call(myDate)); // result: object, [object Date]

// ### [Array](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array)
// This does something similar to the date.  
var myArray = [];
console.log(typeof myArray, toString.call(myArray)); // result: object, [object Array]

// ### [String](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String)
// This is a basic string in JavaScript.  
var myString = 'Hello world';
console.log(typeof myString); // result: string

// ### [Number](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Number)
// This is a basic number in JavaScript and by default is a floating point number.
var myNumber = 12345;
console.log(typeof myNumber);

// ### [Boolean](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Boolean)
// This is a basic string in JavaScript.
console.log(typeof true);

// ### [Function](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function)
// Functions in JavaScript are how you get things done. There are two ways to define them.  
// First is this way below. And you use the function by...
//
// doFunctionyThings();
//
// The `()` on the end of the doFunctionyThings causes the function to execute.
function doFunctionyThings(){
    console.log(this);  // Result: window
}

// This is the other way of defining functions called function variables. When you assign
// a variable such as `User` to equal a function, that function is now referred to as the User's
// **Constructor**
var User = function(name){
    this.name = name;
};
console.log(typeof User);

var user = new User();
console.log(typeof user, toString.call(user));
console.log(user instanceof User);
// Step 2.
// JavaScript is a dynamic language.
// There is no such thing as a 'class'.
// A classes behavior CAN however be emulated using certain patterns.

console.log('---------------- Prototype ----------------');

var Tower = _.extend({}, Backbone.Events);

// Prototype
var Airplane = function(airline, number){
    this.number = number;
    this.airline = airline;
    this.fuelTank = 0;
    
    // We'll get to this
    Tower.on('clear-for-landing', this.land, this);
};

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

// Listening for it's number
Airplane.prototype.land = function(flight){
    if(flight === this.number){
         console.log('wheels down skid skid landed ' + this.number);
    }
    return this;
};

var plane = new Airplane('southwest', 1234);
plane.fuel(50)
    .fly()
    .land(1234);
    
console.log(plane.fuelTank);

// Extend
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
console.log(extendedObj)

// Anonymous functions

// What about private stuff?
// That's where the patterns come in...
// Bring on, Revealing Module Pattern one of the most popular patterns for such a thing
// Uses the concept of a closure.

console.log('---------------- Closure ----------------');
// Closure Demo
var closureDemo = (function(){
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
    
    // I can still use x and Y, just not a and b
    return {
        doSomething: doSomething
    };
}())

console.log(closureDemo.doSomething());

// Now the revealing module pattern stuff...
// Technically this would be considered a static class
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
// Now the revealing PROTOTYPE pattern...
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

console.log(myRevealingPrototypeClass.foo);
console.log(new myRevealingPrototypeClass().foo());

// Use case for reducing jQuery spaghetti code...
// jQuery is a DOM manipulation tool
// NOT a framework, it only has one job (And it's damn good at it)

// So all of this is a big bowl of spaghetti...
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

// It's so much nicer to cache, things, and define functions if needed
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