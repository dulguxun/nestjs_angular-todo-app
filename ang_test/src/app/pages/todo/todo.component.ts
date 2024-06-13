import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from './todo.service';

interface Task {
  id: number;
  title: string;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  // styleUrls: ['./profile.component.css']
})
export class TodoComponent implements OnInit {
  form!: FormGroup;
  tasks: Task[] = []; // Define tasks property
  name: string | null = null;
  selectedTask: Task | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: '',
    });

    // Fetch tasks when component initializes
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.todoService.fetchTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error("Error fetching tasks:", error);
      }
    );
  }

  submitTodo(): void {
    const title = this.form.get('title')?.value;
  
    if(this.selectedTask) {
      // Update task
      this.todoService.updateTask(this.selectedTask.id, title).subscribe(
        (res) => {
          console.log("POST request successful:", res);
          // After adding a task, fetch updated tasks
          this.selectedTask = null;
          this.form.get('title')?.setValue('');
          this.fetchTasks();
        },
        (error) => {
          console.error("Error in POST request:", error);
        }
      );  
    }
    else {
      this.todoService.addTask(title).subscribe(
        (res) => {
          console.log("POST request successful:", res);
          // After adding a task, fetch updated tasks
          this.form.get('title')?.setValue('');
          this.fetchTasks();
        },
        (error) => {
          console.error("Error in POST request:", error);
        }
      );  
    }
  }

  deleteTask(id: number): void {
    // Assuming you have an API endpoint to delete a task
    this.todoService.deleteTask(id).subscribe(
      (res) => {
        console.log("DELETE request successful:", res);
        // After deleting a task, fetch updated tasks
        this.fetchTasks();
      },
      (error) => {
        console.error("Error in DELETE request:", error);
      }
    );
  }

  selectTask(task: Task): void {
    this.selectedTask = task;
    this.form.get('title')?.setValue(task.title);
  }

}
