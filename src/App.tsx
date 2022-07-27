import type { FC } from 'react';
import { TodoContainer } from './features/todos/components/TodoContainer';

const App: FC = () => {
  return (
    <div>
      <TodoContainer />
    </div>
  );
};

export default App;
