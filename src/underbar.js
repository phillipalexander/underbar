var _ = {};

(function () {

	// Return an array of the last n elements of an array. If n is undefined,
	// return just the last element.
	_.last = function (array, n) {
		var cleanArray = Array.prototype.slice.call(array); // "should work on an arguments object"
		if (n === 0) {
			return [];
		} else if (!n) { // "should pull the last element from an array (if missing second arg)"// "should accept an index argument"
			return cleanArray[cleanArray.length - 1];
		} else if (n > cleanArray.length) {
			return cleanArray;
		} else {
			return cleanArray.slice(cleanArray.length - n, cleanArray.length);
		}
	};

	// Like last, but for the first elements
	_.first = function (array, n) {
		var cleanArray = Array.prototype.slice.call(array);
		if (n === 0) {
			return [];
		} else if (!n) {
			return cleanArray[0];
		} else if (n > cleanArray.length) {
			return cleanArray;
		} else {
			return cleanArray.slice(0, n);
		}
	};

	/**
	 * [the iterator argument is a function that has access to three arguments: (see below) thus, the iterator should always take the format of]
	 *
	 *	function (element, index, array) {
	 *		// body...
	 *	}
	 */

	// Call iterator(value, key, collection) for each element of collection
	_.each = function (obj, iterator) {
		var type = Function.prototype.call.bind(Object.prototype.toString);
		var typeObj = type(obj);
		var InputIsArray = typeObj === '[object Array]';
		var InputIsObject = typeObj === '[object Object]';
		var InputIsArguments = typeObj == '[object Arguments]';

		// QUESTION⁄: Why doesn't this work? Why did I have to use type() instead?
		// var InputIsArguments = toString.call(obj) == '[object Arguments]';

		var array = [];
		var i;
		var key;

		if (InputIsArguments || InputIsArray) {
			array = Array.prototype.slice.call(obj);
			for (i = 0; i < array.length; i += 1) {
				iterator(array[i], i, array);
			}
		} else if (InputIsObject) {
			for (key in obj) {
				iterator(obj[key], key, obj);
			}
		}
	};

	/*
	 * TIP: Here's an example of a function that needs to iterate, which we've
	 * implemented for you. Instead of using a standard `for` loop, though,
	 * it uses the iteration helper `each`, which you will need to write.
	 */

	// Returns the index at which value can be found in the array, or -1 if value
	// is not present in the array.
	_.indexOf = function (array, target) {
		var result = -1;

		_.each(array, function (item, index) {
			if (item === target && result === -1) {
				result = index;
			}
		});

		return result;
	};

	// Return all elements of an array that pass a truth test.
	_.filter = function (collection, iterator) {
		var result = [];
		_.each(collection, function (value) {
			if (iterator(value)) {
				result.push(value);
			}
		});
		return result;
	};

	// Return all elements of an array that don't pass a truth test.
	_.reject = function (collection, iterator) {
		var result = [];
		_.each(collection, function (value) {
			if (!iterator(value)) {
				result.push(value);
			}
		});
		return result;
	};

	// Produce a duplicate-free version of the array.
	_.uniq = function (array) {
		var result = [];
		_.each(array, function (value) {
			if (_.indexOf(result, value) === -1) {
				result.push(value);
			}
		});
		return result;
	};
	/*
	 * map() is a useful primitive iteration function that works a lot
	 * like each(), but in addition to running the operation on all
	 * the members, it also maintains an array of results.
	 */

	// Return the results of applying an iterator to each element.
	_.map = function (array, iterator) {
		var cleanArray = Array.prototype.slice.call(array);
		var result = [];
		if (Array.isArray(cleanArray)) {
			var i;
			for (i = 0; i < cleanArray.length; i += 1) {
				result.push(iterator(cleanArray[i], i, cleanArray));
			}
		}
		return result;
	};

	/*
	 * TIP: map is really handy when you want to transform an array of
	 * values into a new array of values. _.pluck() is solved for you
	 * as an example of this.
	 */

	// Takes an array of objects and returns and array of the values of
	// a certain property in it. E.g. take an array of people and return
	// an array of just their ages
	_.pluck = function (obj, propertyName) {
		return _.map(obj, function (value) {
			return value[propertyName];
		});
	};

	// Calls the method named by methodName on each value in the list.
	_.invoke = function (list, methodName) {
		var cleanList = Array.prototype.slice.call(list);
		var result = [];
		var isFunction = typeof methodName === "function";
		var isString = typeof methodName === "string";
		if (true) {
			for (var i = 0; i < cleanList.length; i += 1) {
				// debugger;
				// result.push(cleanList[i][methodName]()); /*string*/
				// result.push(methodName.call(cleanList[i])); /*function*/
				result.push(isString && cleanList[i][methodName]() || isFunction && methodName.call(cleanList[i]));
			}
		}
		return result;
	};

	// value[methodName].call(value) //will work on a string

	// Reduces an array or object to a single value by repetitively calling
	// iterator(previousValue, item) for each item. previousValue should be
	// the return value of the previous iterator call.
	//
	// You can pass in an initialValue that is passed to the first iterator
	// call. Defaults to 0.
	//
	// Example:
	//   var numbers = [1,2,3];
	//   var sum = _.reduce(numbers, function(total, number){
	//     return total + number;
	//   }, 0); // should be 6
	//
	_.reduce = function (obj, iterator, initialValue) {
		// var result if (!initialValue) {0};
		var result = initialValue || 0;
		_.each(obj, function (value) {
			result = iterator(result, value);
		});
		return result;
	};

	// Determine if the array or object contains a given value (using `===`).
	_.contains = function (collection, target) {
		// TIP: A lot of iteration problems can be most easily expressed in
		// terms of reduce(). Here's a freebie to demonstrate!
		return _.reduce(collection, function (wasFound, item) {
			if (wasFound) {
				return true;
			}
			return item === target;
		}, false);
	};

	// Determine whether all of the elements match a truth test.
	_.every = function (obj, iterator) {
		var result = !obj || true;
		_.each(obj, function (value, index, array) {
			if (!iterator(value)) {
				result = false;
			}
		});
		return result;
	};

	// Determine whether any of the elements pass a truth test. If no iterator is
	// provided, provide a default one
	_.any = function (obj, iterator) {
		iterator = iterator || function (value, index, array) {
			if (value === true || value === 'yes') {
				result = true;
			}
		};

		var result = false;
		_.each(obj, function (value, index, array) {
			if (iterator(value)) {
				result = true;
			}
		});
		return result;
	};

	/*
	 * These are a couple of helpers for merging objects
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
	//
	_.extend = function (obj) {
		// var type = Function.prototype.call.bind(Object.prototype.toString);
		// var InputIsObject = (type(obj) === '[object Object]');
		// var ObjectKeys = Object.Keys
		// _.each(obj, function (value, index, array) {
		// 	iterator body
		// })
	};

	// Like extend, but doesn't ever overwrite a key that already
	// exists in obj
	_.defaults = function (obj) {};

	/*
	 * Now we're getting into function decorators, which take in any function
	 * and return out a new version of the function that works somewhat differently
	 */

	// Return a function that can be called at most one time. Subsequent calls
	// should return the previously returned value.
	_.once = function (func) {
		// TIP: These variables are stored in a `closure scope` (worth researching),
		// so that they'll remain available to the newly-generated function every
		// time it's called.
		var alreadyCalled = false;
		var result;
		// TIP: We'll return a new function that delegates to the old one, but only
		// if it hasn't been called before.
		return function () {
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
	// Memoize should return a function that when called, will check if it has
	// already computed the result for the given argument and return that value
	// instead if possible.
	_.memoize = function (func) {};

	// Delays a function for the given number of milliseconds, and then calls
	// it with the arguments supplied.
	//
	// The arguments for the original function are passed after the wait
	// parameter. For example _.delay(someFunction, 500, 'a', 'b') will
	// call someFunction('a', 'b') after 500ms
	_.delay = function (func, wait) {};

	/*
	 * Advanced collection operations
	 */

	// Shuffle an array.
	_.shuffle = function (obj) {
		var array = Array.prototype.slice.call(obj);
		var i, j, swap;
		for (i = array.length - 1; i >= 0; i--) {

			// Pick a remaining element…
			j = Math.floor(Math.random() * (i + 1));

			// And swap it with the current element.
			swap = array[i];
			array[i] = array[j];
			array[j] = swap;
		}
		return array;
	};

	/* (End of pre-course curriculum) */

	// Sort the object's values by a criterion produced by an iterator.
	// If iterator is a string, sort objects by that property with the name
	// of that string. For example, _.sortBy(people, 'name') should sort
	// an array of people by their name.
	_.sortBy = function (collection, iterator) {};

	// Zip together two or more arrays with elements of the same index
	// going together.
	//
	// Example:
	// _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3]]
	_.zip = function () {};

	// Flattens a multidimensional array to a one-dimensional array that
	// contains all the elements of all the nested arrays.
	//
	// Hints: Use Array.isArray to check if something is an array
	//
	_.flatten = function (nestedArray, result) {};

	// Produce an array that contains every item shared between all the
	// passed-in arrays.
	_.intersection = function (array) {};

	// Take the difference between one array and a number of other arrays.
	// Only the elements present in just the first array will remain.
	_.difference = function (array) {};

	/*
	 * Offroad
	 */

	// EXTRA CREDIT:
	// Return an object that responds to chainable function calls for
	// map, pluck, select, etc
	//
	// See README for details
	_.chain = function (obj) {};

	// EXTRA CREDIT:
	// Returns a function, that, when invoked, will only be triggered at most once
	// during a given window of time.
	//
	// See README for details
	_.throttle = function (func, wait) {};

}).call(this);