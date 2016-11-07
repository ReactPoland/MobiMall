export { default as api } from './api';
export { host } from './api';
export { default as auth0lock } from './auth0';

export const bindMethods = classInstance => Object.getOwnPropertyNames(Object.getPrototypeOf(classInstance))
    .filter(property => typeof classInstance[property] === 'function')
    .forEach(method => classInstance[method] = classInstance[method].bind(classInstance));
