import { Component, Inject} from '@angular/core';
import { QuestionInfoOverlayRef } from '../question-info-overlay/question-info-overlayRef';
import { QUESTION_INFO_DATA } from './question-info-overlay.tokens';
import { teams } from '../app.component';
import { ScoringService } from "../scoring.service";
import {Observable} from 'rxjs';

import { timer } from 'rxjs';
import { take,map } from 'rxjs/operators';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-question-info-overlay',
  templateUrl: './question-info-overlay.component.html',
  styleUrls: ['./question-info-overlay.component.css']
})
export class QuestionInfoOverlayComponent {
  teams = teams;
  scoringTeam;
  points;
  question;
  showingDailyDouble;
  showCountdown = false;
  countdown;
  interval;
  picURL;
  constructor(public questionInfoOverlayRef: QuestionInfoOverlayRef,@Inject(QUESTION_INFO_DATA) public questionData: any, public scoringService:ScoringService){
    this.points = questionData.points;
    this.question = questionData.q;
    if(questionData.dailyDouble) {
      const audio = new Audio('../../assets/dailyDouble.mp3');
      audio.play();
    }
    this.showingDailyDouble = questionData.dailyDouble ? this.questionData.dailyDouble : false;
    this.picURL = questionData.picURL ? questionData.picURL : '';
  }

  closeOverlay() {
    this.questionInfoOverlayRef.close();

    if(this.scoringTeam) {
      this.sendPoints();
    }
  }

  selectedTeam(team) {
    this.scoringTeam = team;
  }

  sendPoints() {
    this.scoringService.sendScore(this.scoringTeam, this.points);
  }

  deductPoints() {
    this.scoringService.sendScore(this.scoringTeam, -this.points);
    [].slice.call(document.getElementsByName('teamRadioButton')).forEach(item => {
     item.checked = false;
    });
    this.scoringTeam = '';
  }

  toggleDailyDouble() {
    this.showingDailyDouble = !this.showingDailyDouble;
  }

  startTimer() {
     this.countdown = 8;
    this.showCountdown = true;
    this.interval = setInterval(() => {
      this.countdown--;
      if(this.countdown === 0 ){
        clearInterval(this.interval);
        this.showCountdown = false;
      }
    }, 1000);
  }
  resetTimer() {
    clearInterval(this.interval);
    this.showCountdown = false;
  }
}
