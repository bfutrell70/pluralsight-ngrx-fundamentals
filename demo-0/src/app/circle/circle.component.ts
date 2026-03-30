import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css'],
})
export class CircleComponent implements AfterViewInit {
  @ViewChild("scoreCircle") scoreCircle!: ElementRef<HTMLCanvasElement>;
  private context!: CanvasRenderingContext2D;

  @Input({required: true}) MaxValue!: number;
  @Input({required: true}) Value!: number;

  @Input() Width: number = 100;
  @Input() Height: number = 100;

  private centerX: number = 0;
  private centerY: number = 0;
  private radius: number = 0;
  private fontSize: number = 0;

  private fillStyleColor: string = '#4494E5';

  constructor() {
  }
  
  ngAfterViewInit(): void {
    this.context = this.scoreCircle.nativeElement.getContext("2d")!;
    
    this.centerX = this.Width / 2;
    this.centerY = this.Height / 2;
    this.radius = this.centerY * .9;
    // for a canvas size of 100 x 100, font size of 60px Arial Bold looks good
    this.fontSize = (this.Height / 100) * 60;

    this.drawScoreCircle();
    this.drawPieLines(this.MaxValue);
    this.drawPieSlice(this.MaxValue, this.Value);
    this.drawScore(`${this.Value}`);
  }

  drawScoreCircle(): void {
    this.context.beginPath();
    this.context.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
    this.context.fillStyle = '#eee';
    this.context.fill();
    this.context.strokeStyle = '#C9C9C9';
    this.context.stroke();
  }

  drawPieLines(segments: number): void {
    // starting at 1.5 * Math.PI as 0
    
    // determine the portion of a single segment
    const segmentPortion = (100 / segments) / 100;

    // define starting angle (12:00)
    const startAngle = 1.5 * Math.PI;

    for (let i = 0; i < segments; i++) {
      const currentSegmentPortion = segmentPortion * i;

      this.context.beginPath();
      this.context.moveTo(this.centerX, this.centerY);
      this.context.arc(this.centerX, this.centerY, this.radius, startAngle + (2 * Math.PI * currentSegmentPortion), startAngle + (2 * Math.PI * currentSegmentPortion));
      this.context.strokeStyle = '#C9C9C9';
      this.context.stroke();
    }
  }

  drawPieSlice(maxValue:number, value: number): void {
    // starting at 12:00
    // if max value is 4 and the value is 1 then end angle should be 0
    // if max value is 4 and the value is 2 then end angle should be 0.5 * Math.PI
    // if max value is 4 and the value is 3 then end angle should be 1 * Math.PI
    const ratio = value / maxValue;

    let startAngle = (1.5 * Math.PI);

    // determine the end angle if the start angle was 0
    let endAngle = (2 * Math.PI) * ratio + (1.5 * Math.PI);
    
    this.context.beginPath();

    if (maxValue != value) {
      this.context.moveTo(this.centerX, this.centerY); // move to center of circle
      this.context.arc(this.centerX, this.centerY, this.radius, startAngle, endAngle);  // draw the arc
      this.context.lineTo(this.centerX, this.centerY);  // draw line back to the center of circle
  
      this.context.closePath()
    }
    else {
      this.context.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
    }

    this.context.fillStyle = this.fillStyleColor;
    this.context.fill();

    this.context.strokeStyle = this.fillStyleColor;
    this.context.stroke();
  }

  drawScore(value: string): void {
    this.context.textBaseline = 'middle';
    this.context.textAlign = 'center';
    this.context.font = `bold ${this.fontSize}px Arial`;
    this.context.fillStyle = "black";

    this.context.fillText(value, this.centerX, this.centerY);
  }
}
