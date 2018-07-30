import { Component} from '@angular/core';
import { QuestionInfoOverlayRef } from '../question-info-overlay/question-info-overlayRef';
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
constructor(public questionInfoOverlayRef: QuestionInfoOverlayRef, public scoringService:ScoringService){

}

  closeOverlay() {
    this.questionInfoOverlayRef.close();
    if(this.scoringTeam) {
      this.scoringService.sendScore(this.scoringTeam, 200);
    }
  }

  selectedTeam(team) {
    this.scoringTeam = team;
  }
}
