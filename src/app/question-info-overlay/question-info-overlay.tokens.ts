import {InjectionToken} from "@angular/core";
import { Question } from "./question-info-overlay-service"

export const QUESTION_INFO_DATA = new InjectionToken<Question>('QUESTION_INFO_DATA');
