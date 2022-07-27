import type { FC } from 'react';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';

export const TodoContainer: FC = () => {
  return (
    <div>
      <TodoForm />
      <hr />
      <TodoList />
    </div>
  );
};
