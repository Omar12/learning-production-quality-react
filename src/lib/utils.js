/**
 * @function: partial
 * @param {function} fn 
 * @param {n arguments} args 
 * @description: partial binds the function passed, along with the n amount of arguments
 * @usage: You need to bind values to an unrelated function for it to process the
 * data passed.
 */
export const partial = (fn, ...args) => fn.bind(null, ...args);

/**
 * @function: _pipe
 * @param {function} f 
 * @param {function} g 
 * @description: sequentually trigger 2 functions, first function takes the args
 * and the second function executes with the returned value of the first fn.
 */
const _pipe = (f, g) => (...args) => g(f(...args))

/**
 * @name: pipe
 * @param {n functions} fns 
 * @description: take n list of functions, use reduce until one function value
 * is returned. _pipe can only take 2 functions as arguments.
 */
export const pipe = (...fns) => fns.reduce(_pipe)