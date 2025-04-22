import {Component} from '@angular/core';

@Component({
  selector: 'app-todo-app',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.css']
})
export class TodoAppComponent {
  newTask = '';
  taskList: { name: string; done: boolean }[] = [];
  editingTask: any = null;

  addTask(taskName: string) {
    if (taskName.trim()) {
      this.taskList.push({name: taskName.trim(), done: false});
      this.newTask = '';
    }
  }

  itemStatus(task: any) {
    task.done = !task.done;
  }

  editTask(task: any) {
    this.editingTask = task;
    this.newTask = task.name;
  }

  updateTask() {
    if (this.editingTask && this.newTask.trim()) {
      this.editingTask.name = this.newTask.trim(); // Başındaki ve sonundaki boşlukları temizler
      this.editingTask = null;
      this.newTask = '';
    }
  }

  deleteTask(task: any) {
    this.taskList = this.taskList.filter(t => t !== task);
  }
}
