import type { Todo, TodoInput } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { getCurrentDateTime } from '../utils/date';

export const createTodo = (input: TodoInput): Todo => {
  return {
    id: input.id ?? uuidv4(),
    title: input.title,
    body: input.body,
    status: input.status ?? 'waiting',
    createdAt: input.createdAt || getCurrentDateTime(),
    updatedAt: input.updatedAt,
    deletedAt: input.deletedAt,
  };
};
