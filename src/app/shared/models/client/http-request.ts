import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface HttpRequestParams {
  urlParams?: string;
  queryParams?: string | { [key: string]: string | string[] };
  payload?: any;
}

export interface HttpRequestOptions {
  body?: any;
  headers?: HttpHeaders;
  params?: HttpParams;
  reportProgress?: boolean;
  withCredentials?: boolean;
}
