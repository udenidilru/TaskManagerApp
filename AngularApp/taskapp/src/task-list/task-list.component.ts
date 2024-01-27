import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../model/task.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  
  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      });
  }
  navigateToAdd(): void {
    this.router.navigate(['/add-task']);
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(updatedTasks => this.tasks = updatedTasks);
  }
  navigateToEdit(taskId: number): void {
    this.router.navigate(['/edit-task', taskId]);
  }
}
