import type { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { remove, update, restore } from '../todosSlice';
import { Todo } from '../types';

type Props = {
  todos: Todo[];
};

export const TodoList: FC<Props> = ({ todos }) => {
  const displayStatus = useAppSelector((state) => state.todos.displayStatus);
  const dispatch = useAppDispatch();
  const isSelectDeletedStatus = displayStatus === 'deleted';

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
            <th>{isSelectDeletedStatus ? '復元ボタン' : '削除ボタン'}</th>
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
                      disabled={isSelectDeletedStatus}
                      onClick={() => {
                        // ここでは決め打ちでtitleとbodyのみを更新しているが、
                        // 最終的にはtitle, body, statusに好きな値を入力できるようにする
                        const updateAction = update({
                          id: todo.id,
                          input: {
                            title: '更新したtitle' + Date.now(),
                            body: '更新したbody ' + Date.now(),
                          },
                        });
                        dispatch(updateAction);
                      }}
                    >
                      更新
                    </button>
                  </td>
                  <td>
                    {isSelectDeletedStatus ? (
                      <button
                        onClick={() => {
                          dispatch(restore(todo.id));
                        }}
                      >
                        復元
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          dispatch(remove(todo.id));
                        }}
                      >
                        削除
                      </button>
                    )}
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
