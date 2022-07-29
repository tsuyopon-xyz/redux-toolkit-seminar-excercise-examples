import type { Todo } from '../types';

// 仮に、将来的にlocalStorageに保存するデータが増やしたい時のkeyのルール決めを行なっている。
// ルールは「prefix値:データの種類」
//
// 例: 保存したいデータの種類ごとのlocalStorageのkey
//   - todoデータ    : 'redux-toolkit-seminar:todos'
//   - userデータ    : 'redux-toolkit-seminar:user'
//   - settingデータ : 'redux-toolkit-seminar:setting'
const PREFIX_KEY = 'redux-toolkit-seminar';
const LOCAL_STORAGE_KEY = `${PREFIX_KEY}:todos`;

export const setTodos = (todos: Todo[]) => {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
};

export const getTodos = (): Todo[] => {
  const json = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!json) return [];

  const todos = JSON.parse(json) as Todo[];
  return todos;
};
