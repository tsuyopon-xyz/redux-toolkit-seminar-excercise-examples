import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  selectTodosByDisplayStatus,
  selectIsFetching,
  fetchTodosAsync,
} from '../todosSlice';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { DisplayStatusSelector } from './DisplayStatusSelector';

export const TodoContainer: FC = () => {
  const todos = useAppSelector(selectTodosByDisplayStatus);
  const isFetching = useAppSelector(selectIsFetching);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodosAsync());
  }, []);

  if (isFetching) return <div>読み込み中</div>;

  return (
    <div>
      <TodoForm />
      <hr />
      <DisplayStatusSelector />
      <h2>Todo一覧</h2>
      <TodoList todos={todos} />
    </div>
  );
};
