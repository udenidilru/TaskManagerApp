import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Task } from '../model/task.model';
import { Router } from '@angular/router';
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
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, 
              private taskService: TaskService, 
              private router: Router,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: [null, [Validators.required, futureDateValidator]],
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const newTask: Task = this.taskForm.value;
      this.taskService.createTask(newTask).subscribe(
        (response) => {
          this.notificationService.showNotification('Task created successfully.');
          this.router.navigate(['/']);
        },
        (error) => {
          this.notificationService.showNotification('Can not create task.');
        }
      );
    }
    else {
      // Mark form controls as touched to display validation messages
      this.markFormControlsAsTouched();
    }
  }

  markFormControlsAsTouched(): void {
    Object.values(this.taskForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
  back(): void {
    this.router.navigate(['/']);
  }
  
}
