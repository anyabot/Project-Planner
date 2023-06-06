export interface Task {
  name: string;
  parent: string;
  description: string;
  subtasks: [string, boolean][];
  tags: string[];
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
};

export interface Tag {
  color: string;
  name: string;
}