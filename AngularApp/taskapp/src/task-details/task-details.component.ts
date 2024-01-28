import { Component } from '@angular/core';
import { Task } from '../model/task.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent {
  task: Task | undefined;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const taskId = +params['id'];
      this.taskService.getTaskById(taskId).subscribe(task => {
        this.task = task;
      });
    });
  }
  back(): void {
    this.router.navigate(['/']);
  }
}
