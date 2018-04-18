import { Injectable } from '@angular/core';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ActiveWorkout } from '../model/activeworkout';
import { Workout } from '../model/workout';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const api = {
  url: 'http://localhost:8080/tracker/api/'
}

@Injectable()
export class WorkoutService {

  constructor(private http:HttpClient) { }

  /*getWorkouts():Observable<any[]>{
    return this.localStorage.getItem<Workout>('workouts');
  }

  addWorkout(categories:Workout[]):Observable<boolean>{
    return this.localStorage.setItem('workouts', categories);
  }

  getArchives():Observable<any[]>{
    return this.localStorage.getItem<Archive>('archives');
  }

  archive(archives:Archive[]):Observable<boolean>{
    return this.localStorage.setItem('archives', archives);
  }*/

  getActiveWorkout():Observable<ActiveWorkout>{
    return this.http.get<ActiveWorkout>(api.url+'active-workout');
  }

  getActiveWorkouts():Observable<ActiveWorkout[]>{
    return this.http.get<ActiveWorkout[]>(api.url+'active-workouts');
  }

  startWorkout(activeWorkout:ActiveWorkout):Observable<ActiveWorkout>{
    let body = JSON.stringify(activeWorkout);
    return this.http.post<ActiveWorkout>(api.url+'active-workout/start', activeWorkout, httpOptions);
  }

  endWorkout(activeWorkout:ActiveWorkout):Observable<ActiveWorkout>{
    let body = JSON.stringify(activeWorkout);
    return this.http.post<ActiveWorkout>(api.url+'active-workout/end', activeWorkout, httpOptions);
  }

  getWorkout(id:number):Observable<Workout>{
    return this.http.get<Workout>(api.url+'workout/'+id);
  }

  getWorkouts():Observable<Workout[]>{
    return this.http.get<Workout[]>(api.url+'workouts');
  }

  addWorkout(workout: Workout):Observable<Workout>{
    return this.http.post<Workout[]>(api.url+'workout',workout, httpOptions);
  }

  editWorkout(workout: Workout):Observable<Workout>{
    return this.http.put<Workout[]>(api.url+'workout',workout, httpOptions);
  }

  deleteWorkout(id: number):Observable<>{
    return this.http.delete(api.url+'workout/' + id);
  }

}
