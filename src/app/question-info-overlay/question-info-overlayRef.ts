import { OverlayRef } from '@angular/cdk/overlay';

export class QuestionInfoOverlayRef {

  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.overlayRef.dispose();
  }
}
