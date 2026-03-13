import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fund } from '../models/fund.model';

@Injectable({
  providedIn: 'root',
})
export class FundsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/funds';

  getFunds(): Observable<Fund[]> {
    return this.http.get<Fund[]>(this.apiUrl);
  }
}
