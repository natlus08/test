import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

import { WorkoutService } from '../services/workout.service';

import { ActiveWorkout } from '../model/activeworkout';
import { Workout } from '../model/workout';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  private activeWorkouts:ActiveWorkout[] = [];

  private dataAvailable:boolean = true;

  private today:Date = new Date();

  private todaysWO:number = 0;

  private weeksWO:number = 0;

  private monthsWO:number = 0;

  private days:number = 0;

  private minutes:number = 0;

  private weekChartData: number[] = [];

  private monthChartData: number[] = [];

  private yearChartData: number[] = [];

  private sun: number = 0;
  private mon: number = 0;
  private tue: number = 0;
  private wed: number = 0;
  private thu: number = 0;
  private fri: number = 0;
  private sat: number = 0;

  private w1: number = 0;
  private w2: number = 0;
  private w3: number = 0;
  private w4: number = 0;
  private w5: number = 0;

  private jan: number = 0;
  private feb: number = 0;
  private mar: number = 0;
  private apr: number = 0;
  private may: number = 0;
  private jun: number = 0;
  private jul: number = 0;
  private aug: number = 0;
  private sep: number = 0;
  private oct: number = 0;
  private nov: number = 0;
  private dec: number = 0;


  constructor(private _workoutService: WorkoutService) { }

  ngOnInit() {
    this.dataAvailable = true;
    this.getArchives();
  }

  getArchives(): void{
    this._workoutService.getActiveWorkouts().subscribe((data) => {
        if(data != null){
          this.activeWorkouts = data;
          this.calculateWOMinutes();
          this.chartData();
        }else{
          this.dataAvailable = false;
        }
      }
    );
  }

  calculateWOMinutes(): void{
    var day = this.today.getDay();
    this.activeWorkouts.forEach(activeWorkout => {
      alert(JSON.stringify(activeWorkout))
      let minStartDate = new Date(activeWorkout.startDate.getFullYear(), activeWorkout.startDate.getMonth(), activeWorkout.startDate.getDate(),activeWorkout.startTime.getHours(), activeWorkout.startTime.getMinutes(),0);
      let minEndDate = new Date(activeWorkout.endDate.getFullYear(), activeWorkout.endDate.getMonth(), activeWorkout.endDate.getDate(),activeWorkout.endTime.getHours(), activeWorkout.endTime.getMinutes(),0);
      this.days = Math.ceil((Math.abs(this.today.getTime() - minEndDate.getTime())) / (1000 * 3600 * 24));
      this.minutes = Math.ceil((Math.abs(minEndDate.getTime() - minStartDate.getTime())) / (1000 * 60));
      if(this.days == 1){
        this.todaysWO = this.todaysWO + this.minutes;
      }
      if(this.days <= 7 && this.days <= day){
        this.weeksWO = this.weeksWO + this.minutes;
      }
      if(this.days <= 31 && (this.today.getMonth() === minEndDate.getMonth())){
        this.monthsWO = this.monthsWO + this.minutes;
      }
    });
  }

  chartData(): void {
    var day = this.today.getDay();
    this.activeWorkouts.forEach(activeWorkout => {
      let startDate = new Date(activeWorkout.startDate.getFullYear(), activeWorkout.startDate.getMonth(), activeWorkout.startDate.getDate(),activeWorkout.startTime.getHours(), activeWorkout.startTime.getMinutes(),0);
      let endDate = new Date(activeWorkout.endDate.getFullYear(), activeWorkout.endDate.getMonth(), activeWorkout.endDate.getDate(),activeWorkout.endTime.getHours(), activeWorkout.endTime.getMinutes(),0);
      this.days = Math.ceil((Math.abs(this.today.getTime() - endDate.getTime())) / (1000 * 3600 * 24));
      let calories = this.calorieCalculator(activeWorkout);
      if(this.days <= 7 && this.days <= day){
        if(endDate.getDay() === 0){
          this.sun = this.sun + calories;
        }else if(endDate.getDay() === 1){
          this.mon = this.mon + calories;
        }else if(endDate.getDay() === 2){
          this.tue = this.tue + calories;
        }else if(endDate.getDay() === 3){
          this.wed = this.wed + calories;
        }else if(endDate.getDay() === 4){
          this.thu = this.thu + calories;
        }else if(endDate.getDay() === 5){
          this.fri = this.fri + calories;
        }else if(endDate.getDay() === 6){
          this.sat = this.sat + calories;
        }
      }
      if(this.today.getFullYear() === endDate.getFullYear()) {
        if (endDate.getMonth() === 0) {
          this.jan = this.jan + calories;
        } else if (endDate.getMonth() === 1) {
          this.feb = this.feb + calories;
        } else if (endDate.getMonth() === 2) {
          this.mar = this.mar + calories;
        } else if (endDate.getMonth() === 3) {
          this.apr = this.apr + calories;
        } else if (endDate.getMonth() === 4) {
          this.may = this.may + calories;
        } else if (endDate.getMonth() === 5) {
          this.jun = this.jun + calories;
        } else if (endDate.getMonth() === 6) {
          this.jul = this.jul + calories;
        } else if (endDate.getMonth() === 7) {
          this.aug = this.aug + calories;
        } else if (endDate.getMonth() === 8) {
          this.sep = this.sep + calories;
        } else if (endDate.getMonth() === 9) {
          this.oct = this.oct + calories;
        } else if (endDate.getMonth() === 10) {
          this.nov = this.nov + calories;
        } else if (endDate.getMonth() === 11) {
          this.dec = this.dec + calories;
        }
        if((this.days <= 31) && (this.today.getMonth() === endDate.getMonth())) {
          var dayone = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
          let week = Math.ceil((Math.abs((endDate.getTime() - dayone.getTime()) / 86400000) + dayone.getDay() + 1) / 7 );
          if (week === 1){
            this.w1 = this.w1 + calories;
          }else if(week === 2){
            this.w2 = this.w2 + calories;
          }else if(week === 3){
            this.w3 = this.w3 + calories;
          }else if(week === 4){
            this.w4 = this.w4 + calories;
          }else if(week === 5){
            this.w5 = this.w5 + calories;
          }
        }
      }
    });

    this.weekChartData.push(this.sun);
    this.weekChartData.push(this.mon);
    this.weekChartData.push(this.tue);
    this.weekChartData.push(this.wed);
    this.weekChartData.push(this.thu);
    this.weekChartData.push(this.fri);
    this.weekChartData.push(this.sat);


    this.yearChartData.push(this.jan);
    this.yearChartData.push(this.feb);
    this.yearChartData.push(this.mar);
    this.yearChartData.push(this.apr);
    this.yearChartData.push(this.may);
    this.yearChartData.push(this.jun);
    this.yearChartData.push(this.jul);
    this.yearChartData.push(this.aug);
    this.yearChartData.push(this.sep);
    this.yearChartData.push(this.oct);
    this.yearChartData.push(this.nov);
    this.yearChartData.push(this.dec);

    this.monthChartData.push(this.w1);
    this.monthChartData.push(this.w2);
    this.monthChartData.push(this.w3);
    this.monthChartData.push(this.w4);
    this.monthChartData.push(this.w5);

    this.weekChart.addSerie({
      name: 'workouts',
      data: this.weekChartData
    });
    this.monthChart.addSerie({
      name: 'workouts',
      data: this.monthChartData
    });
    this.yearChart.addSerie({
      name: 'workouts',
      data: this.yearChartData
    });
  }

  calorieCalculator(activeWorkout: ActiveWorkout): number {
    let calStartDate = new Date();
    let calEndDate = new Date();
    calStartDate = new Date(activeWorkout.startDate.getFullYear(), activeWorkout.startDate.getMonth(), activeWorkout.startDate.getDate(),activeWorkout.startTime.getHours(), activeWorkout.startTime.getMinutes(),0);
    calEndDate = new Date(activeWorkout.endDate.getFullYear(), activeWorkout.endDate.getMonth(), activeWorkout.endDate.getDate(),activeWorkout.endTime.getHours(), activeWorkout.endTime.getMinutes(),0);
    return ((calEndDate.getTime() -  calStartDate.getTime())/(1000*60))*activeWorkout.workout.caloriesBurnt;
  }

  timeFormat(date: Date): Date {
    let hoursFormat = date.toString().substring(0, 2);
    let minutesFormat = date.toString().substring(3, 5);
    let secondsFormat = date.toString().substring(6, 8);
    return new Date(1970, 0, 1, hoursFormat, minutesFormat, secondsFormat);
  }

  dateFormat(date: Date): Date {
    let yearFormat = date.toString().substring(0, 4);
    let monthFormat = date.toString().substring(5, 7);
    let dateFormat = date.toString().substring(8, 10);
    return new Date(yearFormat,monthFormat-1,dateFormat, 0, 0, 0);
  }

  private weekChart = new Chart({
    chart: {
      type: 'column'
    },
    title: {
      text: 'Workouts for this week'
    },
    xAxis: {
      categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      title: {
        text: null
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Calories',
        align: 'high'
      },
      labels: {
        overflow: 'justify'
      }
    },
    tooltip: {
      valueSuffix: ' calories'
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: false
        }
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor: '#FFFFFF',
      shadow: true,
      enabled: false
    },
    credits: {
      enabled: false
    }
  });

  private monthChart = new Chart({
    chart: {
      type: 'column'
    },
    title: {
      text: 'Workouts for this Month'
    },
    xAxis: {
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
      title: {
        text: null
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Calories',
        align: 'high'
      },
      labels: {
        overflow: 'justify'
      }
    },
    tooltip: {
      valueSuffix: ' calories'
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: false
        }
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor: '#FFFFFF',
      shadow: true,
      enabled: false
    },
    credits: {
      enabled: false
    }
  });

  private yearChart = new Chart({
    chart: {
      type: 'column'
    },
    title: {
      text: 'Workouts for this year'
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      title: {
        text: null
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Calories',
        align: 'high'
      },
      labels: {
        overflow: 'justify'
      }
    },
    tooltip: {
      valueSuffix: ' calories'
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: false
        }
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor: '#FFFFFF',
      shadow: true,
      enabled: false
    },
    credits: {
      enabled: false
    }
  });
}
