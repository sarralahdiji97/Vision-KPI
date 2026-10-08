import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  public isConfigLoadedEvent: EventEmitter<boolean> = new EventEmitter(false);
  public isLoadingEvent: EventEmitter<boolean> = new EventEmitter(false);
  public isUrlChange: EventEmitter<boolean> = new EventEmitter(false);
  public isDefaultLanguageChange: EventEmitter<boolean> = new EventEmitter(false);
  public isLoggedOut: EventEmitter<boolean> = new EventEmitter(false);
  public isLoggedIn: EventEmitter<boolean> = new EventEmitter(false);
  public sidebarDataChange: EventEmitter<any> = new EventEmitter();
  public httpRequestCount: number = 0;


  constructor() {
  }

}
