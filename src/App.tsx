import { useState, FC } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const onSubmit = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const onChangeTodoCompleted = (updateTodoInput: TodoUpdateInput) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id !== updateTodoInput.id) return todo;
      if (updateTodoInput.completed === undefined) return todo;

      return {
        ...todo,
        completed: updateTodoInput.completed,
      };
    });

    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>簡易Todoアプリ</h1>
      <TodoForm onSubmit={onSubmit} />
      <hr />
      <TodoList todos={todos} onChangeCompleted={onChangeTodoCompleted} />
    </div>
  );
}

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

// Pickの参考記事
// https://typescriptbook.jp/reference/type-reuse/utility-types/pick
type TodoInput = Pick<Todo, 'title'>;

// Partialの参考記事
// https://typescriptbook.jp/reference/type-reuse/utility-types/partial
type TodoUpdateInput = Pick<Todo, 'id'> & Partial<Todo>;

type TodoFormProps = {
  onSubmit: (todo: Todo) => void;
};

const TodoForm: FC<TodoFormProps> = ({ onSubmit }) => {
  const [input, setInput] = useState<TodoInput>({
    title: '',
  });

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!input.title) {
      alert('タイトルを入力してください');
      return;
    }

    const todo = createTodo(input);
    onSubmit(todo);
    setInput({
      title: '',
    });
  };

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setInput({
      title: event.target.value,
    });
  };

  return (
    <form method="post" onSubmit={onSubmitHandler}>
      <label htmlFor="inputTitle">タイトル : </label>
      <input
        id="inputTitle"
        type="text"
        value={input.title}
        onChange={onChangeHandler}
      />
      <input type="submit" value="作成" />
    </form>
  );
};

type TodoListProps = {
  todos: Todo[];
  onChangeCompleted: (updateInput: TodoUpdateInput) => void;
};

const TodoList: FC<TodoListProps> = ({ todos, onChangeCompleted }) => {
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

const createTodo = (input: TodoInput): Todo => {
  return {
    // https://github.com/uuidjs/uuid#uuidv4options-buffer-offset
    id: uuidv4(),
    title: input.title,
    completed: false,
  };
};

export default App;
