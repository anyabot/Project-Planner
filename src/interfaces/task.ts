export interface TaskData {
  name: string;
  id: number;
}

export interface GroupData {
  name: string;
  icon: string;
  color: string;
  tasks: TaskData[];
}