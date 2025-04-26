import {Component, OnInit} from '@angular/core';
import {ApiService} from './api.service'; // ApiService'i import ediyoruz

@Component({
  selector: 'app-api',
  template: `
    <div>
      <h2>Gelen Postlar</h2>
      <div *ngIf="postsList.length === 0">
        Yükleniyor...
      </div>
      <ul *ngIf="postsList.length > 0">
        <li *ngFor="let post of postsList">
          <strong>{{ post.title }}</strong><br>
          {{ post.body }}
        </li>
      </ul>
    </div>
  `,
  styleUrls: []
})
export class ApiRequestComponent implements OnInit {

  postsList: any[] = [];

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.apiService.getPosts().subscribe({
      next: (data) => {
        this.postsList = data;
      },
      error: (err) => {
        console.error('Hata:', err);
      }
    });
  }
}
