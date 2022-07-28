import type { FC } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectTodos, selectDeletedTodos } from '../todosSlice';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';

export const TodoContainer: FC = () => {
  const todos = useAppSelector(selectTodos);
  const deletedTodos = useAppSelector(selectDeletedTodos);

  return (
    <div>
      <TodoForm />
      <hr />
      <h2>Todo一覧</h2>
      <TodoList todos={todos} />
      <hr />
      <h2>削除されたTodo一覧</h2>
      <TodoList todos={deletedTodos} />
    </div>
  );
};
