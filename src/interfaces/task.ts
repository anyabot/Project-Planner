export interface TaskData {
  name: string;
  id: number;
  description: string;
  subtasks: [string, boolean][]
  tags: number[]
}

export interface GroupData {
  name: string;
  color: string;
  tasks: TaskData[];
}

export interface Tag {
  id: number;
  color: string;
  name: string;
}