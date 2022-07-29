import type { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  changeDisplayStatus,
  DISPLAY_STATUS_MAP,
  DisplayStatusType,
} from '../todosSlice';

export const DisplayStatusSelector: FC = () => {
  const displayStatus = useAppSelector((status) => status.todos.displayStatus);
  const dispatch = useAppDispatch();

  const onChangeHandler: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const selectedStatus = e.target.value as DisplayStatusType;
    dispatch(changeDisplayStatus(selectedStatus));
  };

  return (
    <div>
      閲覧フラグ
      <select value={displayStatus} onChange={onChangeHandler}>
        {Object.entries(DISPLAY_STATUS_MAP).map(([key, value]) => {
          return (
            <option key={key} value={key}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
};
