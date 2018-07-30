import { Component } from '@angular/core';
declare var require: any
import { ScoringService } from './scoring.service';
import {forEach} from "@angular/router/src/utils/collection";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  teams = teams;
  subscription;
  questionsFromJson = require('../assets/questions.json');
  categories = this.questionsFromJson['categories'];
  points200 = this.questionsFromJson['200'];
  points400 = this.questionsFromJson['400'];
  points600 = this.questionsFromJson['600'];
  points800 = this.questionsFromJson['800'];
  points1000 = this.questionsFromJson['1000'];

  constructor(public scoringService: ScoringService) {
    this.subscription = this.scoringService.getScore().subscribe(teamAndPoints =>  {
      this.updatePoints(teamAndPoints);
    });
  }
  updatePoints(teamAndPoints) {
    this.teams.forEach(team => {
        if(team === teamAndPoints.team) {
          team.score = team.score + teamAndPoints.points;
        }
      });
    }

}


export const teams = [
  {name:'team 1', score: 0},
  {name:'team 2', score: 0},
  {name:'team 3', score: 0},];
