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
  // The rows array holds the status of each field in each row for the clock
  // Each field can be either true or false (light on/off)
  public rows: boolean[][] = [];
  public secondsStatus = false;

  constructor() { }

  ngOnInit(): void {
    // Set default status
    this.fillRowsArray();
    // Update the clock every second
    setInterval(() => {
      let date: Date = new Date;
      this.updateDate(date);
    }, 1000);
  }

  // Initialize all fields of the rows array with value "false"
  // This means the light for each field in each row is off (no time is displayed)
  private fillRowsArray(): void {
    for (let r: number = 0; r < 4; r++) {
      this.rows[r] = [];
      let blocksInRow: number = 4;
      if (r == 2) blocksInRow = 11;
      for (let i: number = 0; i < blocksInRow; i++) {
        this.rows[r][i] = false;
      }
    }
  }

  // Update the clock by turning on/off the lights according to the current time
  private updateDate(date: Date): void { 

    // Get the current time
    let hours: number = date.getHours();
    let minutes: number = date.getMinutes();
    let seconds: number = date.getSeconds();

    // Let the seconds light blink every two seconds
    this.secondsStatus  = !this.secondsStatus;

    // Calculate for each row how much lights should be on/off at the current time
    // Turn on/off the lights in each field according to the calculation
    // "true" = light on, "false" = light off

    // 5 hours row
    let hoursFirst: number = Math.floor(hours / 5);
    for (let i: number = 0; i < 4; i++) {
      if(i < hoursFirst) {
        this.rows[0][i] = true;
      } else {
        this.rows[0][i] = false;
      }
    }

    // 1 hour row
    let hoursSecond: number = Math.floor(hours % 5);
    for (let i: number = 0; i < 4; i++) {
      if(i < hoursSecond) {
        this.rows[1][i] = true;
      } else {
        this.rows[1][i] = false;
      }
    }

    // 5 minutes row
    let minutesFirst: number = Math.floor(minutes / 5);
    for (let i: number = 0; i < 11; i++) {
      if(i < minutesFirst) {
        this.rows[2][i] = true;
      } else {
        this.rows[2][i] = false;
      }
    }

    // 1 minute row
    let minutesSecond: number = Math.floor(minutes % 5);
    for (let i: number = 0; i < 4; i++) {
      if(i < minutesSecond) {
        this.rows[3][i] = true;
      } else {
        this.rows[3][i] = false;
      }
    }

    // Format text for digital clock view
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
