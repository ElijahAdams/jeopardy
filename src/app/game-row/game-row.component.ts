import { Component, OnInit, Input, Inject } from '@angular/core';
import { Overlay, OverlayRef} from "@angular/cdk/overlay";
import {QuestionInfoOverlayService} from '../question-info-overlay/question-info-overlay-service';
import { Portal, ComponentPortal } from '@angular/cdk/portal';
import {QuestionInfoOverlayRef} from '../question-info-overlay/question-info-overlayRef';

@Component({
  selector: 'app-game-row',
  templateUrl: './game-row.component.html',
  styleUrls: ['./game-row.component.css']
})
export class GameRowComponent  {

  @Input() questionsArrayInfo;
  overlayRef: QuestionInfoOverlayRef
  constructor(private overlay:Overlay, private questionInfoOverlay: QuestionInfoOverlayService){

  }

  createPopUp() {
    this.overlayRef  = this.questionInfoOverlay.open({
        hasBackdrop: true,
        backdropClass: 'dark-backdrop',
        panelClass: 'jeo-panel-class',
        width: '500px',
        height: '500px'
      });
  }

  closePopUp() {
    this.overlayRef.close();
  }
}

