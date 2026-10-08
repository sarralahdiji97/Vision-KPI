import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageKeys } from '../enums/general.enum';
import { EventService } from '../services/event-service/event-service.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private eventService: EventService
    ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const Token = localStorage.getItem(LocalStorageKeys.TOKEN);
    if (Token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${Token}`,
        },
      });
    }
    this.eventService.isLoadingEvent.next(true);
    this.eventService.httpRequestCount++;

    return next.handle(request);
  }
}
