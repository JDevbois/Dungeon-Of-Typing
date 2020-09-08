import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WordServiceService {

  constructor(private http: HttpClient) { }

  get randomWord(): Observable<string[]>{
    return this.http.get(`https://random-word-api.herokuapp.com/word?number=1`).pipe(
      map((list: any[]): string[] => list),
      share()
    )
  }
}
