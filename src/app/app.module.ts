import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddworkoutComponent } from './addworkout/addworkout.component';
import { StartworkoutComponent } from './startworkout/startworkout.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { EditworkoutComponent } from './editworkout/editworkout.component';
import { ViewworkoutsComponent } from './viewworkouts/viewworkouts.component';
import { EndworkoutComponent } from './endworkout/endworkout.component';
import { TrackComponent } from './track/track.component';
import { mainrouting } from './router/main-routing.module';
//import services
import { CategoryService } from './services/category.service';
import { WorkoutService } from './services/workout.service';
//import pipes
import { CategoryFilterPipe } from './pipes/categoryfilter.pipe';
//import models
//import { Category } from './model/category'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddworkoutComponent,
    StartworkoutComponent,
    AddcategoryComponent,
    EditworkoutComponent,
    ViewworkoutsComponent,
    EndworkoutComponent,
    TrackComponent,
    CategoryFilterPipe
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    mainrouting,
    AsyncLocalStorageModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CategoryService, WorkoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
