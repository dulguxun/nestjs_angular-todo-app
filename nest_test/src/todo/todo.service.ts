import { Injectable } from '@nestjs/common';

export interface Task {
  id: number;
  title: string;
  username: string;
  mail: string;
}

@Injectable()
export class TodoService {
  public tasks: Task[] = [];

   getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task): void {
    this.tasks.push(task);
  }

  updateTask(task: Task): void {
    this.tasks = this.tasks.map((t) => (t.id === task.id ? task : t));
  }

  getTaskCount(): number {
    return this.tasks.length;
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
