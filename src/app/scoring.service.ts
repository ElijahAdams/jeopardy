import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ScoringService {
  scored = new Subject()

  constructor() { }

  sendScore(team, points) {
    this.scored.next({team, points});
  }

  getScore() {
    return this.scored.asObservable();
  }
}
