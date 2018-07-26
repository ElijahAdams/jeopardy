import { Injectable, ComponentRef, InjectionToken } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { Portal, ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { QuestionInfoOverlayComponent } from '../question-info-overlay/question-info-overlay.component';
import {QuestionInfoOverlayRef} from "./question-info-overlayRef";

export const QUESTION_INFO_DATA = new InjectionToken('QUESTION_INFO_DATA');

interface questionInfoPanelConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  height?: string;
  width?: string;
}
const DEFAULT_CONFIG: questionInfoPanelConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'jeo-panel-class',
  width: '500px',
  height: '500px'
}

@Injectable()
export class QuestionInfoOverlayService {
  constructor(private overlay: Overlay) { }

  open(panelConfig : questionInfoPanelConfig) {

    const config = {...DEFAULT_CONFIG, ...panelConfig},
          overlayRef = this.createOverlay(config),
          questionInfoPortal = new ComponentPortal(QuestionInfoOverlayComponent),
          questionInfoOverlayRef = new QuestionInfoOverlayRef(overlayRef);

    overlayRef.attach(questionInfoPortal);

    overlayRef.backdropClick().subscribe(_ => questionInfoOverlayRef.close());
    return questionInfoOverlayRef;
  }

  private createOverlay(config:questionInfoPanelConfig) {
    const overlayConfig = this.getOverlayConfig(config);

    return this.overlay.create(overlayConfig);
  }


  private getOverlayConfig(config: questionInfoPanelConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically(),

     overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      height: config.height,
      width: config.width,
      positionStrategy
    });

    return overlayConfig;
  }

}
