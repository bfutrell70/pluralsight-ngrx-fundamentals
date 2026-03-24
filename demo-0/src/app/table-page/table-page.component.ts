import { Component } from '@angular/core';

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.css']
})
export class TablePageComponent {
  columns: number[] = [];
  rows: number[] = [];

  constructor() {
    for (let i = 1; i <= 20; i++) {
      this.columns.push(i);
    }

    for (let i = 0; i < 40; i++) {
      this.rows.push(i);
    }
  }
}
