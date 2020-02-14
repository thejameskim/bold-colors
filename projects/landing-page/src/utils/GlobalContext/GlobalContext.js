import { createContext } from 'react';

/**
 * GlobalContext will be a global state we can utilize from everywhere without passing props down all the time
 * 
 * To add another field, add it to this GlobalContext and then within components/Main/Main.js (where we have the 
 * GlobalContext.Provider, define some value that is set to the GlobalContext. Whenever state is updated in 
 * Main.js for whatever value you need, it will be sent to the GlobalContext value)
 * 
 * Usage: 
 * ```js
 * import { useContext } from 'react';
 * import { GlobalContext } from '/GlobalContext';
 * 
 * // within react component, use as a hook
 * const { windowWidth } = useContext(GlobalContext);
 * ```
 */
export const GlobalContext = createContext({
	windowWidth: 0
})