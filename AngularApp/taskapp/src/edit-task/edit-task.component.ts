import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { Task } from '../model/task.model';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NotificationService } from '../services/notification.service';

function futureDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const selectedDate = new Date(control.value as string);
  const currentDate = new Date();
  const currentDateOnly = currentDate.toLocaleDateString('en-US');
  const selectedDateOnly = selectedDate.toLocaleDateString('en-US');

  if (selectedDateOnly && selectedDateOnly < currentDateOnly) {
    return { 'futureDate': true };
  }

  return null;
}

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  taskId!: number;
  task: Task = { id: 0, title: '', description: '', dueDate: new Date() };
  taskForm: FormGroup = new FormGroup({});

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.taskId = +params['id']; 
      this.getTask();
    });
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: [null, [Validators.required, futureDateValidator]],
    });
    this.taskService.getTaskById(this.taskId).subscribe((task) => {
      this.taskForm.patchValue(task);
    });
  }

  getTask(): void {
    this.taskService.getTaskById(this.taskId).subscribe(task => {
      this.task = task;
    });
  }

  updateTask(): void {
    debugger
    if (this.taskForm.valid) {
      const updatedTask = this.taskForm.value;
      this.taskService.updateTask(this.taskId, updatedTask).subscribe(() => {
        this.notificationService.showNotification('Task updated successfully.');
        this.router.navigate(['']);
      });
    } else {
      this.taskForm.markAllAsTouched();
    }
  }

  back(): void {
    this.router.navigate(['/']);
  }
}
