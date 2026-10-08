import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestMethod } from '../../enums/http-request-method-enum';
import { AppConfig } from '../../models/client/app-config';
import { HttpRequestOptions, HttpRequestParams } from '../../models/client/http-request';
import { EventService } from '../event-service/event-service.service';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService {
  public appConfig: AppConfig | undefined;

  constructor(private http: HttpClient, private eventService: EventService) {
  }

  public load(): Promise<void> {
    return new Promise((resolve, reject) => {
      const subscription = this.http
        .get('./assets/config/app-config.json')
        .subscribe({
          next: (config: AppConfig) => {
            this.appConfig = config;
            this.eventService.isConfigLoadedEvent.next(true);
            resolve();
            subscription.unsubscribe();
          },
          error: (error: string) => reject(error),
        });
    });
  }

  public urlParamsParser(url: string, param?: string): string {
    if (param) {
      url = `${url}/${param}`;
    }
    return url;
  }

  public queryParamsParser(
    queryParams: string | { [key: string]: string | string[] }
  ): HttpParams | undefined {
    if (!queryParams) {
      return undefined;
    }
    return new HttpParams(
      typeof queryParams === 'string'
        ? { fromString: queryParams }
        : { fromObject: queryParams }
    );
  }

  public getHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Accept', 'application/json; charset=utf-8');
    return headers;
  }

  public getRequestUrl(endPoint: string) {
    return `${this.appConfig?.api}${endPoint}`;
  }

  private request<T>(
    method: string,
    endPoint: string,
    options: HttpRequestOptions
  ) {
    return this.http.request<T>(method, this.getRequestUrl(endPoint), {
      ...options,
      headers: this.getHeaders(),
    });
  }

  public get<T>(
    endPoint: string,
    httpRequest?: HttpRequestParams
  ): Observable<T> {
    return this.request<T>(
      HttpRequestMethod.Get,
      this.urlParamsParser(
        endPoint,
        httpRequest ? httpRequest.urlParams : undefined
      ),
      {
        params: this.queryParamsParser(
          (httpRequest && httpRequest.queryParams) || {}
        ),
      }
    );
  }

  public post<T>(
    endPoint: string,
    httpRequest?: HttpRequestParams
  ): Observable<T> {
    return this.request<T>(
      HttpRequestMethod.Post,
      this.urlParamsParser(
        endPoint,
        httpRequest ? httpRequest.urlParams : undefined
      ),
      {
        params: this.queryParamsParser(
          (httpRequest && httpRequest.queryParams) || {}
        ),
        body: httpRequest ? httpRequest.payload : undefined,
      }
    );
  }

  public put<T>(
    endPoint: string,
    httpRequest?: HttpRequestParams
  ): Observable<T> {
    return this.request<T>(
      HttpRequestMethod.put,
      this.urlParamsParser(
        endPoint,
        httpRequest ? httpRequest.urlParams : undefined
      ),
      {
        params: this.queryParamsParser(
          (httpRequest && httpRequest.queryParams) || {}
        ),
        body: httpRequest ? httpRequest.payload : undefined,
      }
    );
  }

  public patch<T>(
    endPoint: string,
    httpRequest?: HttpRequestParams
  ): Observable<T> {
    return this.request<T>(
      HttpRequestMethod.Patch,
      this.urlParamsParser(
        endPoint,
        httpRequest ? httpRequest.urlParams : undefined
      ),
      {
        params: this.queryParamsParser(
          (httpRequest && httpRequest.queryParams) || {}
        ),
        body: httpRequest ? httpRequest.payload : undefined,
      }
    );
  }

  public delete<T>(
    endPoint: string,
    httpRequest?: HttpRequestParams
  ): Observable<T> {
    return this.request<T>(
      HttpRequestMethod.Delete,
      this.urlParamsParser(
        endPoint,
        httpRequest ? httpRequest.urlParams : undefined
      ),
      {
        params: this.queryParamsParser(
          (httpRequest && httpRequest.queryParams) || {}
        ),
        body: httpRequest ? httpRequest.payload : undefined,
      }
    );
  }
}
