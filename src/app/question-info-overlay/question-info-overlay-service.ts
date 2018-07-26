import { Injectable } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { Portal, ComponentPortal } from '@angular/cdk/portal';
import { QuestionInfoOverlayComponent } from '../question-info-overlay/question-info-overlay.component';

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

    // Returns an OverlayRef (which is a PortalHost)
    const overlayRef = this.overlay.create(this.getOverlayConfig(panelConfig));

    // Create ComponentPortal that can be attached to a PortalHost
    const questionInfoPortal = new ComponentPortal(QuestionInfoOverlayComponent);

    // Attach ComponentPortal to PortalHost
    overlayRef.attach(questionInfoPortal);
  }

  private getOverlayConfig(config: questionInfoPanelConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      height: config.height,
      width: config.width,
      positionStrategy
    });

    return overlayConfig;
  }

}
