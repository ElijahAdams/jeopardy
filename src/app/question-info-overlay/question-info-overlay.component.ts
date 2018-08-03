import { Component, Inject} from '@angular/core';
import { QuestionInfoOverlayRef } from '../question-info-overlay/question-info-overlayRef';
import { QUESTION_INFO_DATA } from './question-info-overlay.tokens';
import { teams } from '../app.component';
import {ScoringService} from "../scoring.service";

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
  showingDailyDouble = true;

  constructor(public questionInfoOverlayRef: QuestionInfoOverlayRef,@Inject(QUESTION_INFO_DATA) public questionData: any, public scoringService:ScoringService){
    console.log(questionData);

    this.points = questionData.points;
    this.question = questionData.q;
    if(questionData.dailyDouble) {
      const audio = new Audio('../../assets/dailyDouble.mp3');
      audio.play();
    }
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
}
