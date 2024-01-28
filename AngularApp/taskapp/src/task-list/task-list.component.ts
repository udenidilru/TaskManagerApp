import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../model/task.model';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  
  constructor(private taskService: TaskService, 
              private router: Router,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Error fetching tasks:', error);
        this.notificationService.showNotification('Error fetching tasks');
      });
  }
  navigateToAdd(): void {
    this.router.navigate(['/add-task']);
  }

  deleteTask(id: number): void {
    //this.taskService.deleteTask(id).subscribe(updatedTasks => this.tasks = updatedTasks);
    this.taskService.deleteTask(id).subscribe(
      updatedTasks => {
        this.tasks = updatedTasks;
        this.notificationService.showNotification('Task deleted successfully.');
      },
      error => {
        console.error(error);
        this.notificationService.showNotification('Can not delete task.');
      });
  }
  navigateToEdit(taskId: number): void {
    this.router.navigate(['/edit-task', taskId]);
  }

  onTaskClick(task: any): void {
    this.router.navigate(['/task-details', task.id]);
  }
}
