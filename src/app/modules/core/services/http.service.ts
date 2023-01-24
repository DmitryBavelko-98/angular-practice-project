import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { GetParams } from '../models/get-params';
import { HttpServiceHeaders } from '../models/http-service-headers';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  get(url: string, params?: GetParams, headers?: HttpServiceHeaders): Observable<any> {
    const options = this.setRequestOptions(params, headers);

    return this.http.get(url, options)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  post<T>(url: string, body: T, params?: GetParams, headers?: HttpServiceHeaders): Observable<any> {
    const options = this.setRequestOptions(params, headers);
    
    return this.http.post(url, body, options)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  put<T>(url: string, body: T , params?: GetParams, headers?: HttpServiceHeaders): Observable<any> {
    const options = this.setRequestOptions(params, headers);

    return this.http.put(url, body, options)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  private setRequestOptions(
    params?: GetParams, 
    headers?: HttpServiceHeaders,
  ) {
    return {
      headers: headers,
      params: params,
      observe: 'response' as const,
      responseType: 'json' as const,
    }
  }
}