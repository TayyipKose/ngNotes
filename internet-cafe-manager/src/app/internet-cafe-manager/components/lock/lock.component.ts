import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-lock',
  templateUrl: './lock.component.html',
  styleUrls: ['./lock.component.scss']
})
export class LockComponent implements OnInit {
  currentTime: Date = new Date();

  @Output() timeChanged = new EventEmitter<Date>();

  ngOnInit() {
    interval(1000).subscribe(() => {
      this.currentTime = new Date();
      this.timeChanged.emit(this.currentTime);
    });
  }
}
