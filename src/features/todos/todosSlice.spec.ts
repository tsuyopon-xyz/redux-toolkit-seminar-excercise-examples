import todosReducer, { create, TodoState } from './todosSlice';
import { TodoInput, TodoId } from './types';

describe('todos reducer', () => {
  const initialState: TodoState = {
    todos: [],
    displayStatus: 'all',
    isFetching: false,
    error: null,
  };

  it('should handle create reducer', () => {
    const payload: TodoInput = {
      title: 'title1',
      body: 'body1',
    };

    const newState = todosReducer(initialState, create(payload));
    const todos = newState.todos;

    expect(todos.length).toEqual(1);
    expect(typeof todos[0].id).toEqual('string');
    expect(todos[0].title).toEqual(payload.title);
    expect(todos[0].body).toEqual(payload.body);
    expect(todos[0].status).toEqual('waiting');
    expect(todos[0].createdAt).not.toEqual(undefined);
    expect(todos[0].updatedAt).toEqual(undefined);
    expect(todos[0].deletedAt).toEqual(undefined);
    expect(newState).toEqual({
      todos,
      displayStatus: 'all',
      isFetching: false,
      error: null,
    });
  });
});
