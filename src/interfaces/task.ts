export interface Task {
  name: string;
  parent: string;
  description: string;
  subtasks: [string, boolean][];
  tags: string[];
  members: string[];
  due?: number | null;
  comments: Comment[]
}

export interface Group {
  name: string;
  parent: string;
  color: string;
  tasks: string[];
}

export interface Board {
  name: string;
  parent: string,
  groups: string[];
  tags: {[key: string] : Tag}
  members: Member[]
};

export interface Tag {
  color: string;
  name: string;
}

export interface User {
  avatar: string;
  name: string;
  email: string
}

export interface Member {
  id: string;
}

export interface Comment {
  user: string;
  time: number;
  content: string
}