/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    var aLen = array.length;
    return n === undefined ? array[aLen - 1] : array.slice(Math.max(aLen - n, 0), aLen);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if(collection.length > 0 && Array.isArray(collection)){
      //collection is an array.
      for (var i = 0; i < collection.length; i++){
        iterator(collection[i], i, collection);
      }
    }else if(collection.length === undefined && typeof collection === "object"){
      //collection is an object.
      for (var key in collection){
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var passArray = [];
    _.each(collection, function(item) {
      if(test(item)){
        passArray.push(item);
      } 
    });
    return passArray;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(item){
      return !test(item);
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var newArray = array.slice();
    for(var i = array.length - 1; i > -1; i--){
      if(newArray.indexOf(newArray[i]) !== i){
        //REMEMBER TO USE .splice() INSTEAD OF .pop()!!!
        newArray.splice(i, 1);
      }
    }
    return newArray;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var newArray = [];
    _.each(array, function(item){
      newArray.push(iterator(item));
    });
    return newArray;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  // Note: you will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    var newArray = [];
    if(typeof functionOrKey === 'string'){
      _.each(collection, function(item){
        if(item[functionOrKey] !== undefined){
          newArray.push(item[functionOrKey].apply(item, args));
        }
      });
    }else if(typeof functionOrKey === 'function'){
      _.each(collection, function(item){
        newArray.push(functionOrKey.apply(item, args));
      });
    }

    return newArray;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
    if(accumulator === undefined){
      var initialValue = collection[0];
      var startPos = 1;
    }else{
      var initialValue = accumulator;
      var startPos = 0;
    }
    for (var i = startPos; i < collection.length; i++){
      var initialValue = iterator(initialValue, collection[i]);
    }
    return initialValue;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    if(Array.isArray(collection)){
      //collection is an array.
      return _.reduce(collection, function(wasFound, item) {
        if (wasFound) {
          return true;
        }
        return item === target;
      }, false);
    }else if(collection !== null && typeof collection === 'object'){
      //collection is an object. ("typeof null bug" in JS remedied)
      return _.reduce(Object.keys(collection), function(wasFound, item) {
        if (wasFound) {
          return true;
        }
        return collection[item] === target;
      }, false);
    }
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // Give a default iterator.
    var iterator = iterator || _.identity;
    // TIP: Try re-using reduce() here.
    return _.reduce(collection, function(isTrue, item){
      if (!isTrue){
        return false;
      }
      return Boolean(iterator(item));
    },true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    var iterator = iterator || _.identity;
    var iteratorFalse = function(item){
      return !iterator(item); 
    };
    return !(_.every(collection, iteratorFalse));
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    for(var i = 0; i < arguments.length; i++){
      for(var j in arguments[i]){
        obj[j] = arguments[i][j];
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for(var i = 0; i < arguments.length; i++){
      for(var j in arguments[i]){
        if(obj[j] === undefined){
          obj[j] = arguments[i][j];
        }
      }
    }
    return obj;
  };

  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var lastArgument;
    var result;

    return function(){
      if(!(arguments === lastArgument)){
        result = func.apply(this, arguments);
        lastArgument = arguments;
      }
      return result;
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = [];
    for (var i = 2; i < arguments.length; i++){
      args.push(arguments[i]);
    }
    var delayedFunction = function(){
      return func.apply(this, args);
    };
    console.log(args);
    setTimeout(delayedFunction, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var multiArray = [];
    for(var i = 0; i < array.length; i++){
      multiArray.push([Math.random(), array[i]]);
    }
    console.log(multiArray);
    multiArray.sort(function(item1, item2){
      return item1[0] - item2[0];
    });
    return _.map(multiArray, function(item){return item[1];});
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {

    if(typeof iterator === 'string'){
      //iterator is an object property.
      collection.sort(function(a, b){
        return a[iterator] - b[iterator];
      });
    }else if(typeof iterator === 'function'){
      //iterator is a function.
      collection.sort(function(a, b){
        return iterator(a) - iterator(b);
      });
    }
    
    return collection;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var zippedArray = [];
    var maxLength = _.reduce(arguments, function(length, arr){return Math.max(length, arr.length);}, 0);
    //console.log(maxLength);
    for(var i = 0; i < maxLength; i++){
      var subArray = [];
      for(var j = 0; j < arguments.length; j++){
        subArray.push(arguments[j][i]);
      }
      zippedArray.push(subArray);
    }
    return zippedArray;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    for(var i = 0; i < nestedArray.length; i++){
      if(Array.isArray(nestedArray[i])){
        for(var j = 0; j < nestedArray[i].length; j++){
          nestedArray.push(nestedArray[i][j]);
        }
        nestedArray.splice(i, 1);
        //Recursion magic! Used to keep nestedArray.length updated.
        _.flatten(nestedArray);
      }
    }
    return nestedArray;

  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    return _.reduce(arguments, function(commonItems, array){
      return _.filter(commonItems, function(item){
        for(var i = 0; i < array.length; i++){
          if(item === array[i]){
            return true;
          }
        }
        return false;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    return _.reduce(arguments, function(uniqueItems, array){
      return _.filter(uniqueItems, function(item){
        for(var i = 0; i < array.length; i++){
          if(item === array[i]){
            return false;
          }
        }
        return true;
      });
    });
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
    var lastCalledTime;
    var result;
    var scheduled = false;
    return function(){
      if(!scheduled){
        var thisTime = new Date();
        if(thisTime - lastCalledTime < wait){
          //Delay Mode.
          var delayedFunction = function(){
            result = func.apply(this, arguments);
            lastCalledTime = new Date();
            scheduled = false;
          };
          scheduled = true;
          setTimeout(delayedFunction, wait - (thisTime - lastCalledTime));
          return result;
        }else{
          //Okay Mode.
          result = func.apply(this, arguments);
          lastCalledTime = thisTime;
          return result;
        }
      }else{
        //Scheduled Mode.
        console.log("Scheduled already!");
        return result;
      }
    };
  };
  
  //Custom function similar to _.throttle, but allows queuing up of function calls.
  _.queue = function(func, wait) {
    var lastCalledTime;
    var result;
    return function(){
      var thisTime = new Date();
      if(thisTime - lastCalledTime < wait){
        //console.log(thisTime - lastCalledTime);
        //Delay Mode.
        var delayedFunction = function(){
          result = func.apply(this, arguments);
          //Update lastCalledTime.
        };
        //Temporary lastCalledTime assigned.
        lastCalledTime.setTime(lastCalledTime.getTime() + wait);
        var delayTime = wait - (thisTime - lastCalledTime);
        setTimeout(delayedFunction, wait - (thisTime - lastCalledTime));
        console.log(delayTime);
        return result;
      }else{
        //Okay mode.
        result = func.apply(this, arguments);
        lastCalledTime = thisTime;
        return result;
      }
    };
  };

}).call(this);
