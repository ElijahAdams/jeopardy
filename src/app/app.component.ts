import { Component } from '@angular/core';
declare var require: any


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app';
  questionsFromJson = require('./questions.json');
  categories = this.questionsFromJson['categories'];
  points200 = this.questionsFromJson['200'];

  constructor(){

  }


}
