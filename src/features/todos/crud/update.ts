import type { Todo } from '../types';
import { getCurrentDateTime } from '../utils/date';

export const updateTodo = (todo: Todo): Todo => {
  return {
    ...todo,
    updatedAt: getCurrentDateTime(),
  };
};
