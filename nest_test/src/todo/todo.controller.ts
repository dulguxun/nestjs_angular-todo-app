import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { TodoService, Task } from './todo.service';

@Controller('task')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTasks(): Task[] {
    return this.todoService.getTasks();
  }

  @Post('/add')
  addTask(@Body() taskData: { name: string; email: string; todo: string }): { message: string; tasks: Task[] } {
    const currentTaskCount = this.todoService.getTaskCount();
    const newId = currentTaskCount + 1;

    const newTask: Task = {
      id: newId,
      title: taskData.todo,
      username: taskData.name,
      mail: taskData.email,
    };
    this.todoService.addTask(newTask);

    const tasks = this.todoService.getTasks(); // Fetch all tasks after adding the new one
    return { message: 'Task added successfully', tasks }; 
  }

  @Post('/update')
  updateTask(@Body() taskData: { id: number, username: string; mail: string; title: string }): { message: string; } {
    this.todoService.updateTask(taskData);

    return { message: 'Task added successfully' }; 
  }

  @Post('/delete')
  deleteTask(@Body() taskId: { id: number }): { message: string; } {
    this.todoService.deleteTask(taskId.id);
    return { message: 'Task deleted successfully' };
  }
}
