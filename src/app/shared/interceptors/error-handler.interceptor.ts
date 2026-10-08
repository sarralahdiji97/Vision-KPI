import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ResponseApi } from '../models/client/ResponseApi';
import { EventService } from '../services/event-service/event-service.service';
import { DialogService } from '../services/dialog-service/dialog.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private dialogService:DialogService,
    private eventService: EventService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((event) => {
        if (event instanceof HttpResponse) {
          if (this.eventService.httpRequestCount > 0) {
            this.eventService.httpRequestCount--;
          }
          if (this.eventService.httpRequestCount == 0) {
            this.eventService.isLoadingEvent.next(false);
          }

          let apiResponse: ResponseApi = event.body as ResponseApi;
          if (apiResponse.success == false) {
            this.dialogService.openErrorDialog(
              { statusCode: 200, message: apiResponse.message as string },
              { width: '480px', disableClose: true }
            );
          }
        }
        return event;
      }),
      catchError((error) => this.handleError(error, request, next))
    );
  }

  private handleError(
    err: HttpErrorResponse,
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    let errorMessage: string;
    this.eventService.isLoadingEvent.next(false);
    switch (err.status) {
      case 400:
      case 503: {
        errorMessage = err.error.message;
        this.dialogService.openErrorDialog(
          { statusCode: err.status, message: errorMessage },
          { width: '480px', height: '400px', disableClose: true }
        );
        break;
      }
      case 701: {
        errorMessage = err.error.message;
        this.router.navigate(['/pageNotfound'], {
          queryParams: { forbidden: true },
        });
        this.dialogService.openErrorDialog(
          { statusCode: err.status, message: errorMessage },
          { width: '480px', height: '360px', disableClose: true }
        );
        break;
      }
      case 401: {
        this.eventService.httpRequestCount = 0;
        this.router.navigate(['/login']);
        break;
      }
      case 403: {
        this.router.navigate(['/pageNotfound'], {
          queryParams: { forbidden: true },
        });
        errorMessage = err.message;
        this.dialogService.openErrorDialog(
          { statusCode: err.status, message: errorMessage },
          { width: '480px', height: '400px', disableClose: true }
        );
        break;
      }
      default: {
        errorMessage = err.message;
        this.dialogService.openErrorDialog(
          { statusCode: err.status, message: errorMessage },
          { width: '480px', height: '400px', disableClose: true }
        );
        break;
      }
    }
    if (this.eventService.httpRequestCount > 0) {
      this.eventService.httpRequestCount--;
    }
    if (this.eventService.httpRequestCount == 0) {
      this.eventService.isLoadingEvent.next(false);
    }
    return throwError(() => err);
  }
}
