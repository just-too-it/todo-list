export type TodoProps = {
  id?: number | string;
  title: string;
  description?: string;
  completed: boolean;
  attachment?: any[];
  date?: string;
  files?: {
    fileName: string;
    fileLink: string;
  }[];
};
