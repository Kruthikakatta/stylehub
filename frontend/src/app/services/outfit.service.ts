import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({providedIn:'root'})
export class OutfitService {
  private apiUrl = `${environment.apiUrl}/outfits`;
  constructor(private http:HttpClient){}
  getOutfits():Observable<any>{return this.http.get(this.apiUrl);}
  getOutfitById(id:string):Observable<any>{return this.http.get(`${this.apiUrl}/${id}`);}
}