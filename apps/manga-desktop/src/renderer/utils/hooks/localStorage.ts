import { useState } from 'react';

/**
A React hook that provides a way to store and retrieve a value from local storage.
@template T The type of the value to be stored in local storage.
@param {string} key The key to use for the local storage entry.
@param {T} defaultValue The default value to return if no value is found in local storage.
@returns {[T, (value: T) => void]} A tuple containing the current value and a function to update the value in local storage.
*/
export const useLocalStorage = <T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return defaultValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return defaultValue;
    }
  });

  const setValue = (value: T) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return [storedValue, setValue];
};
