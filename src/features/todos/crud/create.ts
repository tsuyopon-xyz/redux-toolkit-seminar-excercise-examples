import { v4 as uuidv4 } from 'uuid';
import type { Todo, TodoInput } from '../types';

export const createTodo = (input: TodoInput): Todo => {
  return {
    // https://github.com/uuidjs/uuid#uuidv4options-buffer-offset
    id: uuidv4(),
    title: input.title,
    completed: false,
  };
};
