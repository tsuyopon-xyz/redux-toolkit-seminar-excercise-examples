import type { Todo } from '../types';
import { getCurrentDateTime } from '../utils/date';

export const removeTodo = ({
  id,
  title,
  body,
  status,
  createdAt,
  updatedAt,
}: Todo): Todo => {
  return {
    id,
    title,
    body,
    status,
    createdAt,
    updatedAt,
    deletedAt: getCurrentDateTime(),
  };
};
