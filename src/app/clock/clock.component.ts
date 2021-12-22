import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  public hoursText: string = "";
  public minutesText: string = "";
  public secondsText: string = "";
  public rows: boolean[][] = [];
  public secondsStatus = false;

  constructor() { }

  ngOnInit(): void {
    this.fillRowsArray();
    setInterval(() => {
      let date: Date = new Date;
      this.updateDate(date);
    }, 1000);
  }

  private fillRowsArray(): void {
    for (let r: number = 0; r < 4; r++) {
      this.rows[r] = [];
      let blocksInRow: number = 4;
      if (r == 2) blocksInRow = 11;
      for (let i: number = 0; i < blocksInRow; i++) {
        this.rows[r][i] = false;
      }
    }
    console.log(this.rows);
  }

  private updateDate(date: Date): void { 

    let hours: number = date.getHours();
    let minutes: number = date.getMinutes();
    let seconds: number = date.getSeconds();

    this.secondsStatus  = !this.secondsStatus;

    let hoursFirst: number = Math.floor(hours / 5);
    for (let i: number = 0; i < 4; i++) {
      if(i < hoursFirst) {
        this.rows[0][i] = true;
      } else {
        this.rows[0][i] = false;
      }
    }

    let hoursSecond: number = Math.floor(hours % 5);
    for (let i: number = 0; i < 4; i++) {
      if(i < hoursSecond) {
        this.rows[1][i] = true;
      } else {
        this.rows[1][i] = false;
      }
    }

    let minutesFirst: number = Math.floor(minutes / 5);
    for (let i: number = 0; i < 11; i++) {
      if(i < minutesFirst) {
        this.rows[2][i] = true;
      } else {
        this.rows[2][i] = false;
      }
    }

    let minutesSecond: number = Math.floor(minutes % 5);
    for (let i: number = 0; i < 4; i++) {
      if(i < minutesSecond) {
        this.rows[3][i] = true;
      } else {
        this.rows[3][i] = false;
      }
    }

    if (hours < 10) {
      this.hoursText = "0" + hours;
    } else {
      this.hoursText = "" + hours;
    }
    if (minutes < 10) {
      this.minutesText = "0" + minutes;
    } else {
      this.minutesText = "" + minutes;
    }
    if (seconds < 10) {
      this.secondsText = "0" + seconds;
    } else {
      this.secondsText = "" + seconds;
    }

  }
}
