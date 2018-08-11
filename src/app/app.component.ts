import { Component, Renderer2 } from '@angular/core';
declare var require: any;
import { ScoringService } from './scoring.service';
import {QuestionInfoOverlayRef} from "./question-info-overlay/question-info-overlayRef";
import {QuestionInfoOverlayService} from "./question-info-overlay/question-info-overlay-service";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  overlayRef: QuestionInfoOverlayRef;
  teams = teams;
  subscription;
  questionsFromJson = require('../assets/questions2.json');
  categories = this.questionsFromJson['categories'];

  r1 = this.questionsFromJson['r1'];
  r2 = this.questionsFromJson['r2'];
  r3 = this.questionsFromJson['r3'];
  r4 = this.questionsFromJson['r4'];
  r5 = this.questionsFromJson['r5'];

  constructor(public scoringService: ScoringService, public renderer: Renderer2, private questionInfoOverlay: QuestionInfoOverlayService) {
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

  manualPointProcess(team) {
    event.srcElement.classList.add('hideScore');
    const scoreInputElement = this.createScoreInputElement(event,team);
    event.srcElement.insertAdjacentElement('beforebegin', scoreInputElement);
    scoreInputElement.focus();
  }

  createScoreInputElement(clickEvent,team) {
   const element = document.createElement("input");
    element.type = 'text';
    element.value = team.score;
    this.renderer.listen(element,'keyup.enter',() => {
      this.manualUpdatePoints(element,team);
      clickEvent.srcElement.classList.remove('hideScore');
      });

    this.renderer.listen(element,'blur',() => {
      this.manualUpdatePoints(element,team);
      element ? element.remove(): console.log();
      clickEvent.srcElement.classList.remove('hideScore');
    });
    return element
  }

  manualUpdatePoints(element,team) {
    if(element.value) {
      team.score = parseInt(element.value);
    }
    else {
      team.score = team.score;
    }
  }

  openExample() {
    this.overlayRef  = this.questionInfoOverlay.open({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      panelClass: 'jeo-panel-class',
      width: '700px',
      height: '700px',
      data: {
        "q": "what is google",
        "points": 200,
        "answered": false,
        "dailyDouble": false,
        "answer":"google"
      },
    });
  }

  finalJeo(){
    this.overlayRef  = this.questionInfoOverlay.open({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      panelClass: 'jeo-panel-class',
      width: '700px',
      height: '700px',
      data: {
        "q": "The company contracted to build this house",
        "points": 0,
        "answered": false,
        "dailyDouble": false,
        "answer":"Ryan Homes"
      },
    });
  }
}


export const teams = [
  {name:'K & K', score: 0},
  {name:'A & B', score: 0},
  {name:'C & T', score: 0},
  {name:'J', score: 0}];
