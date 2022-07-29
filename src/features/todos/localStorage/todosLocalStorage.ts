import type { Todo } from '../types';

const PREFIX_KEY = 'redux-toolkit-seminar';
const LOCAL_STORAGE_KEY = `${PREFIX_KEY}:todos`;

export const setTodos = (entities: Todo[]) => {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entities));
};

export const getTodos = (): Todo[] => {
  const jsonEntities = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!jsonEntities) return [];

  const entities = JSON.parse(jsonEntities) as Todo[];
  return entities;
};
