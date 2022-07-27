import type { FC } from 'react';
import { useAppSelector } from '../../../app/hooks';

export const TodoList: FC = () => {
  const todos = useAppSelector((state) => state.todos.todos);

  return (
    <>
      <table border={1}>
        <thead>
          <tr>
            <th>id</th>
            <th>タイトル</th>
            <th>本文</th>
            <th>ステータス</th>
            <th>作成日時</th>
            <th>更新日時</th>
            <th>削除日時</th>
            <th>更新ボタン</th>
            <th>削除ボタン</th>
          </tr>
        </thead>
        <tbody>
          {todos.length === 0 ? (
            <tr>
              <td colSpan={9} style={{ textAlign: 'center' }}>
                データなし
              </td>
            </tr>
          ) : (
            todos.map((todo) => {
              return (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.title}</td>
                  <td>{todo.body}</td>
                  <td>{todo.status}</td>
                  <td>{todo.createdAt}</td>
                  <td>{todo.updatedAt ?? '無し'}</td>
                  <td>{todo.deletedAt ?? '無し'}</td>
                  <td>
                    <button
                      onClick={() => {
                        //TODO: 更新機能の実装
                      }}
                    >
                      更新
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        //TODO: 削除機能の実装
                      }}
                    >
                      削除
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </>
  );
};

export default TodoList;
