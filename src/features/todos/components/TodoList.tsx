import type { FC } from 'react';
import type { Todo, TodoUpdateInput } from '../types';

type TodoListProps = {
  todos: Todo[];
  onChangeCompleted: (updateInput: TodoUpdateInput) => void;
};

export const TodoList: FC<TodoListProps> = ({ todos, onChangeCompleted }) => {
  return (
    <table border={1}>
      <thead>
        <tr>
          <th>id</th>
          <th>タイトル</th>
          <th>進捗</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => {
          const { id, completed, title } = todo;
          return (
            <tr key={id}>
              <td>{id}</td>
              <td>{title}</td>
              <td>
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={(event) => {
                    onChangeCompleted({
                      ...todo,
                      completed: event.target.checked,
                    });
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
