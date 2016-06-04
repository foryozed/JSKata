
//======= DIFFERENT WAYS TO CREATE JS OBJECTS ==========================================================

//by using object literals 
var elvis = {
    name: 'Elvis Presley',
    albums: [{ title: 'All Shook Up' }, { title: 'Suspicious Minds' }],
    topAlbum: { title: 'All Shook Up' },
    orWeCanAlsoWriteTopAlbumAs: function () {
        return {
            title: 'All Shook Up'
        }
    }
}

//by using constructors
var WorldCup = function (year, host) {
    this.year = year;
    this.host = host;
    this.changeHostCountry = function (newvalue) {
        this.host = newvalue;
    }
}

var qatarWorldCup = new WorldCup(2022, 'Qatar');
qatarWorldCup.changeHostCountry('USA');


//by using prototypes
if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        var F = function () { };
        F.prototype = o;
        return new F;
    };
}
var germanyWorldCup = Object.create(qatarWorldCup);
germanyWorldCup.changeHostCountry('Germany');

//==== HANDLING THE 'this' KEYWORD - it depends on the function invocation pattern, these patterns are ================

// 1-Method Invocation Pattern: the function is a property of an object, and invoked as object.foo(). 
//   The function in this case is called 'method'. using 'this' inside methods will always refer to the containing object. 

elvis.dance = function (songName) {
    console.log(this.name + ' is singing ' + songName +
        ' shaking his hips, twisting his ankles, and rocking the whole jail fantastically!');
}

// 2-Function Invocation Pattern: the function is NOT a property of an object, and invoked simply as foo(). 
//  The function in this case is called 'function'. using 'this' inside it will always refer to the global object. 
//  The book/materials indicates that this was a mistake in the design of the language, because if we have 
//  an inner function of a function its 'this' will still refer to the 'this' of the outer function, the work around is like this:
var obj;
obj.boo = function() {
    var self = this;
    var foo = function() {
        console.log(this); //prints the global object ( Window {external: Object, chrome: Object, document: document, true: Object, HIDE_TIMEOUT: 2000…})
        console.log(self); //prints the object 'obj'
    }
    foo();
};


// 3-The Constructor Invocation Pattern: when a function is going to be invoked using the 'new' keyword, we call it 'constructor', and its name
//      has to start with an upper case character. 'this' in constructors refers to the new object created by the new keyword.

var Zoo = function(numberOfAnimals) {
    this.animalCount = numberOfAnimals;
    this.print = function() {
        console.log(this.animalCount);
    }
}
var columbusZoo = new Zoo(695);
columbusZoo.print();

// 4-Call and Apply: these are 2 functions used to invoke functions. The first parameter for both functions is the 'context',
//   this keyword inside the function that will be invoked will always refer to this 'context' that we pass. Another difference is
//   that apply passes arguments to the target function as an array, while call can pass them directly.

elvis.dance.call(elvis, 'Hound Dog');
elvis.dance.apply(elvis, ['Hound Dog']);



//======= PROTPTYPES AND OTHER CONCEPTS LEARNED FROM THE STUDY MATERIALS =================================


var xx = { boo: 'hello', hoo: 464, foo: function () { } };
var yy = Object.create(xx);
console.log(yy.boo); //prints 'hello'

var zz = Object.create();  //exception - object prototype may only be an Object or null
var ww = Object.create(null);
console.log(ww.boo); // undefined

yy.boo = 'good bye';
console.log(yy.boo); //prints 'good bye'
console.log(xx.boo); //prints 'hello'

xx.zoo = 'new property';
console.log(yy.zoo == 'new property' ? 'prototypes are dynamic' : 'prototypes are NOT dynamic'); //prints prototypes are dynamic



//---- Reflection --------------------------------------
console.log(typeof xx.hoo); //prints 'number'
console.log(typeof xx.boo); //prints 'string'
console.log(typeof xx.foo); //prints 'function'

yy.moo = 'own property'; //hasOwnProperty doesn't look at the prototype chain.
console.log(yy.hasOwnProperty('moo'));
console.log(yy.hasOwnProperty('boo'));


//---- Enumeration --------------------------------------
var xx = { boo: 'hello', hoo: 464, foo: function () { } };
for (prop in xx)
    if (xx.hasOwnProperty(prop)) {
        console.log(prop); //will print prop names  
        console.log(xx[prop]); //will print prop values  
    }


//---- Delete --------------------------------------
delete xx.boo; //deleting an own property, this can be used to make a chain property shine through
console.log(xx.boo); // undefined 
console.log(yy.boo); // undefined 
delete yy.hoo;
console.log(yy.hoo); //prints 464
delete xx.hoo;
console.log(yy.hoo); //undefined


