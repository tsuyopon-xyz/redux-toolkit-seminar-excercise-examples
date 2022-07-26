import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { decrement, increment, incrementAsync } from './counterSlice';

export function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>{count}</div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
          aria-label="Increment async value"
          onClick={() => dispatch(incrementAsync())}
        >
          Increment async
        </button>
      </div>
    </div>
  );
}
