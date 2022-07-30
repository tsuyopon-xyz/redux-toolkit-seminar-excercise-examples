import todosReducer, {
  create,
  remove,
  update,
  restore,
  changeDisplayStatus,
  fetchTodosAsync,
  TodoState,
  DisplayStatusType,
} from './todosSlice';
import { Todo, TodoInput, TodoId, TodoUpdatePayload } from './types';

describe('todos reducer', () => {
  it('should handle create reducer', () => {
    const initialState: TodoState = {
      todos: [],
      displayStatus: 'all',
      isFetching: false,
      error: null,
    };

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

  it('should handle remove reducer', () => {
    const targetId = 'test-id-1';
    const initialState: TodoState = {
      todos: [
        {
          id: targetId,
          title: '',
          body: '',
          status: 'waiting',
          createdAt: '2022-07-30 00:00:00',
        },
        {
          id: 'test-id-2',
          title: '',
          body: '',
          status: 'waiting',
          createdAt: '2022-07-30 00:00:00',
        },
      ],
      displayStatus: 'all',
      isFetching: false,
      error: null,
    };

    const payloadForRemove: TodoId = targetId;
    const newState = todosReducer(initialState, remove(payloadForRemove));

    expect(newState.todos.length).toEqual(2);
    expect(newState.todos[0].deletedAt !== undefined).toEqual(true);
    expect(newState.todos[1].deletedAt === undefined).toEqual(true);
  });

  it('should handle update reducer', () => {
    const targetId = 'test-id-1';
    const initialState: TodoState = {
      todos: [
        {
          id: targetId,
          title: '',
          body: '',
          status: 'waiting',
          createdAt: '2022-07-30 00:00:00',
        },
      ],
      displayStatus: 'all',
      isFetching: false,
      error: null,
    };

    const payloadForUpdate: TodoUpdatePayload = {
      id: targetId,
      input: {
        title: 'updated title',
        body: 'updated body',
        status: 'completed',
      },
    };
    const newState = todosReducer(initialState, update(payloadForUpdate));

    expect(newState.todos[0].title).toEqual(payloadForUpdate.input.title);
    expect(newState.todos[0].body).toEqual(payloadForUpdate.input.body);
    expect(newState.todos[0].status).toEqual(payloadForUpdate.input.status);
    expect(newState.todos[0].updatedAt !== undefined).toEqual(true);
  });

  it('should handle restore reducer', () => {
    const targetId = 'test-id-1';
    const initialState: TodoState = {
      todos: [
        {
          id: targetId,
          title: '',
          body: '',
          status: 'waiting',
          createdAt: '2022-07-30 00:00:00',
          deletedAt: '2022-07-30 00:00:00',
        },
      ],
      displayStatus: 'all',
      isFetching: false,
      error: null,
    };

    const payloadForRestore: TodoId = targetId;
    const newState = todosReducer(initialState, restore(payloadForRestore));
    expect(newState.todos[0].deletedAt === undefined).toEqual(true);
  });

  it('should handle changeDisplayStatus reducer', () => {
    const initialState: TodoState = {
      todos: [],
      displayStatus: 'all',
      isFetching: false,
      error: null,
    };

    const payloadForRestore: DisplayStatusType = 'updated';
    const newState = todosReducer(
      initialState,
      changeDisplayStatus(payloadForRestore)
    );
    expect(newState.displayStatus).toEqual(payloadForRestore);
  });
});

describe('todos extraReducer(async thunk)', () => {
  it('makes displayStatus "true" when pending', async () => {
    const initialState: TodoState = {
      todos: [],
      displayStatus: 'all',
      isFetching: false,
      error: null,
    };

    const action = {
      type: fetchTodosAsync.pending.type,
    };

    const newState = todosReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      isFetching: true,
    });
  });

  it('makes displayStatus "false" and assign todos if exist when fulfilled', async () => {
    const initialState: TodoState = {
      todos: [],
      displayStatus: 'all',
      isFetching: false,
      error: null,
    };

    const action = {
      type: fetchTodosAsync.fulfilled.type,
      payload: [
        {
          id: 'hello',
        },
      ] as Todo[],
    };

    const newState = todosReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      isFetching: false,
      todos: [...action.payload],
    });
  });

  it('makes displayStatus "false" and assign error when rejected', async () => {
    const initialState: TodoState = {
      todos: [],
      displayStatus: 'all',
      isFetching: false,
      error: null,
    };

    const action = {
      type: fetchTodosAsync.rejected.type,
      error: 'error',
    };

    const newState = todosReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      isFetching: false,
      error: action.error,
    });
  });
});
