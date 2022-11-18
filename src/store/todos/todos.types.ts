import { TodoProps } from 'components/Todo/Todo.types';
import { STATUS } from 'core/constants/status';

export type TodosState = {
  todos: TodoProps[];
  status: STATUS;
  error: string;
};
