import type { Todo } from '../types';

export const restoreTodo = (todo: Todo): Todo => {
  return {
    ...todo,
    deletedAt: undefined,
  };
};
