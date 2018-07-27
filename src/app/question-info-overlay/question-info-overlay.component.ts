import { Component } from '@angular/core';
import {QuestionInfoOverlayRef} from '../question-info-overlay/question-info-overlayRef';

@Component({
  selector: 'app-question-info-overlay',
  templateUrl: './question-info-overlay.component.html',
  styleUrls: ['./question-info-overlay.component.css']
})
export class QuestionInfoOverlayComponent {

  closeOverlay() {
    console.log('close me');
  }

}
