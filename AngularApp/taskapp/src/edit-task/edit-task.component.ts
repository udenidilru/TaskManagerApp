import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { Task } from '../model/task.model';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  taskId!: number;
  task: Task = { id: 0, title: '', description: '', dueDate: new Date() };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.taskId = +params['id']; // '+' is used to convert string to number
      this.getTask();
    });
  }

  getTask(): void {
    this.taskService.getTaskById(this.taskId).subscribe(task => {
      this.task = task;
    });
  }

  updateTask(): void {
    this.taskService.updateTask(this.taskId,this.task).subscribe(() => {
      this.router.navigate(['']);
    });
  }
  back(): void {
    this.router.navigate(['/']);
  }
}
