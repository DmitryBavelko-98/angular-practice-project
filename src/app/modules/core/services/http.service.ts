import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, map, find, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private data!: Observable<any>;

  constructor(private http: HttpClient) { }

  getData(url: string): Observable<any> {
    if(!this.data) {
      this.http.get(url)
        .pipe(data => this.data = data);
    }

    return this.data;
  }

  postData(data: unknown[], newData: unknown): Observable<any> {
    return of(data)
      .pipe(
        map(res => {
          res.push(newData);
          return res;
        })
      );
  }

  editData(data: unknown[], editData: any): Observable<any> {
    return of(data)
      .pipe(
        map(res => {
            const index = res.findIndex((res: any) => res.id === editData.id);

            data[index] = editData;

            return data;
          }
        )
      )
  }
}
