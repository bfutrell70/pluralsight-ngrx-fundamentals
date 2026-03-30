import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CircleComponent } from '../circle/circle.component';

@Component({
  selector: 'app-circle-test',
  templateUrl: './circle-test.component.html',
  styleUrls: ['./circle-test.component.css'],
})
export class CircleTestComponent implements AfterViewInit {
  @ViewChild("scoreCircle") scoreCircle!: ElementRef<HTMLCanvasElement>;
  private context!: CanvasRenderingContext2D;

  constructor() {
  }

  ngAfterViewInit(): void {
  }

  
}
