import { Injectable, ComponentRef, InjectionToken, Injector } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { Portal, ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { QuestionInfoOverlayComponent } from '../question-info-overlay/question-info-overlay.component';
import { QuestionInfoOverlayRef } from "./question-info-overlayRef";
import { QUESTION_INFO_DATA } from "./question-info-overlay.tokens";


export interface Question {
  q: string,
  points: number,
  answered: boolean,
  dailyDouble?: boolean,
  picURL?:string,
  answer:string

}

interface questionInfoPanelConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  height?: string;
  width?: string;
  data?:Question;
}

const DEFAULT_CONFIG: questionInfoPanelConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'jeo-panel-class',
  //width: '500px',
  height: '500px'
}

@Injectable()
export class QuestionInfoOverlayService {
   scored;

  constructor(private overlay: Overlay,  private injector: Injector) { }

  open(panelConfig : questionInfoPanelConfig) {

    const config = {...DEFAULT_CONFIG, ...panelConfig},

          overlayRef = this.createOverlay(config),


          questionInfoOverlayRef = new QuestionInfoOverlayRef(overlayRef),

          questionInfoPortal = this.attachDataContainer(overlayRef,config,questionInfoOverlayRef);


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


  private createInjector(config: questionInfoPanelConfig, overlayRef: QuestionInfoOverlayRef): PortalInjector {
    const injectionTokens = new WeakMap();

    //tell the injection token what you want to be available in the overlay component
    injectionTokens.set(QuestionInfoOverlayRef, overlayRef);
    injectionTokens.set(QUESTION_INFO_DATA, config.data);
    return new PortalInjector(this.injector, injectionTokens);
  }

  private attachDataContainer(overlayRef: OverlayRef, config: questionInfoPanelConfig,
                              questionInfoOverlayRef: QuestionInfoOverlayRef) {

    const injector = this.createInjector(config, questionInfoOverlayRef);
    const containerPortal = new ComponentPortal(QuestionInfoOverlayComponent, null, injector);
    const containerRef: ComponentRef<QuestionInfoOverlayComponent> = overlayRef.attach(containerPortal);

    return containerRef.instance;
  }

}

