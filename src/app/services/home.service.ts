import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService{
  constructor(private http: HttpClient){}
  getRickAndMortyCharacter() {
    return this.http.get<any>('https://rickandmortyapi.com/api/character')
  }

  changePage(url){
    return this.http.get<any>(url)
  }

  filter(name:string){
    return this.http.get<any>(`https://rickandmortyapi.com/api/character/?name=${name}`)
  }

  filterGender(gender:string){
    return this.http.get<any>(`https://rickandmortyapi.com/api/character/?gender=${gender}`)
  }

  detail(id:string){
    return this.http.get<any>(`https://rickandmortyapi.com/api/character/${id}`)
  }
}
