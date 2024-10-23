import { atom } from "nanostores";

const getCachedValue = (key: string) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "");
  } catch (err) {
    return null;
  }
};

export const persistendStorage = <T>(key: string, initialValue: T) => {
  const store = atom<T>(getCachedValue(key) ?? initialValue);
  store.listen((value) => {
    localStorage.setItem(key, JSON.stringify(value));
  });
  return store;
};
