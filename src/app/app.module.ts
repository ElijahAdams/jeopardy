import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GameRowComponent } from './game-row/game-row.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatSliderModule} from '@angular/material/slider';
import { QuestionInfoOverlayComponent } from './question-info-overlay/question-info-overlay.component';
import {QuestionInfoOverlayService} from './question-info-overlay/question-info-overlay-service';
@NgModule({
  declarations: [
    AppComponent,
    GameRowComponent,
    QuestionInfoOverlayComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    OverlayModule,
    MatSliderModule
  ],
  providers: [QuestionInfoOverlayService],
  bootstrap: [AppComponent],
  entryComponents : [QuestionInfoOverlayComponent]
})
export class AppModule { }
