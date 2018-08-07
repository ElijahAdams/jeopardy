import { Component, Renderer2 } from '@angular/core';
declare var require: any;
import { ScoringService } from './scoring.service';



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
  r1 = this.questionsFromJson['r1'];
  r2 = this.questionsFromJson['r2'];
  r3 = this.questionsFromJson['r3'];
  r4 = this.questionsFromJson['r4'];
  r5 = this.questionsFromJson['r5'];

  constructor(public scoringService: ScoringService, public renderer: Renderer2) {
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
      element.remove();
      clickEvent.srcElement.classList.remove('hideScore');
      });

    this.renderer.listen(element,'blur',() => {
      this.manualUpdatePoints(element,team);
      element.remove();
      clickEvent.srcElement.classList.remove('hideScore');
    });
    return element
  }

  manualUpdatePoints(element,team) {
    team.score = parseInt(element.value);
  }

}


export const teams = [
  {name:'team 1', score: 0},
  {name:'team 2', score: 0},
  {name:'team 3', score: 0},];
