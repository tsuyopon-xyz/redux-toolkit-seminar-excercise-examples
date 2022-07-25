export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

// Pickの参考記事
// https://typescriptbook.jp/reference/type-reuse/utility-types/pick
export type TodoInput = Pick<Todo, 'title'>;

// Partialの参考記事
// https://typescriptbook.jp/reference/type-reuse/utility-types/partial
export type TodoUpdateInput = Pick<Todo, 'id'> & Partial<Todo>;
