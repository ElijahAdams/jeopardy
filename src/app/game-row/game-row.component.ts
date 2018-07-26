import { Component, OnInit, Input, Inject } from '@angular/core';
import { Overlay, OverlayRef} from "@angular/cdk/overlay";
import {QuestionInfoOverlayService} from '../question-info-overlay/question-info-overlay-service';
import { Portal, ComponentPortal } from '@angular/cdk/portal';


@Component({
  selector: 'app-game-row',
  templateUrl: './game-row.component.html',
  styleUrls: ['./game-row.component.css']
})
export class GameRowComponent  {
  @Input() questionsArrayInfo;

  constructor(private overlay:Overlay, private questionInfoOverlay: QuestionInfoOverlayService){

  }

  createPopUp() {
    this.questionInfoOverlay.open({
        hasBackdrop: true,
        backdropClass: 'dark-backdrop',
        panelClass: 'jeo-panel-class',
        width: '500px',
        height: '500px'
      }
    );

  }
}

