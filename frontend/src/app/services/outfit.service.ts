import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn:'root'})
export class OutfitService {
  private apiUrl='http://localhost:3000/api/outfits';
  constructor(private http:HttpClient){}
  getOutfits():Observable<any>{return this.http.get(this.apiUrl);}
  getOutfitById(id:string):Observable<any>{return this.http.get(`${this.apiUrl}/${id}`);}
}