import { Todo } from '../types';
import { getTodos } from '../localStorage/todosLocalStorage';

type Response = {
  data: Todo[];
};

export const fetchTodos = async (): Promise<Response> => {
  return new Promise((resolve) => {
    // 今回はローカルストレージからデータを取得しているが、
    // バックエンドでDBを用意してAPIを通して取得することもできる。
    // その場合はfetchTodosの呼び出し元は変えず、この関数（fetchTodos）の中身を修正するだけで良い。
    // （関数のシグネチャさえ決めれば、関数の呼び出す側は、その関数の中身を知る必要はない）
    //
    // シグネチャとは
    // https://e-words.jp/w/%E3%82%B7%E3%82%B0%E3%83%8D%E3%83%81%E3%83%A3.html#:~:text=%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0%E3%81%AE%E5%88%86%E9%87%8E%E3%81%A7%E3%81%AF%E3%80%81%E9%96%A2%E6%95%B0,%E3%82%B7%E3%82%B0%E3%83%8D%E3%83%81%E3%83%A3%E3%81%AB%E3%82%88%E3%81%A3%E3%81%A6%E8%AD%98%E5%88%A5%E3%81%95%E3%82%8C%E3%82%8B%E3%80%82
    const todos: Todo[] = getTodos();

    setTimeout(() => resolve({ data: todos }), 1000);
  });
};
