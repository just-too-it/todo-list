export type TodoProps = {
  id?: number | string;
  title: string;
  description?: string;
  completed: boolean;
  attachment?: any[];
  attachmentName?: string;
  attachmentLink?: string;
  date?: string;
};
