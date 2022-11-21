import { Injectable } from '@angular/core';
import{ HttpClient }from '@angular/common/http'
import { map } from 'rxjs/operators';
import { identifierName } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private _http:HttpClient) { }

  // Create restaurent using post method
  postRestaurent(data:any){
    return this._http.post<any>("http://localhost:3000/posts",data).pipe(map((res:any)=>{
      return res;
    }))
  }

  // get Restuarent using get Method
  getRestaurent(){
    return this._http.get<any>("http://localhost:3000/posts").pipe(map((res:any)=>{
      return res;
    }))
  }
    // update restaurent using put Method
    updateRestaurent(data:any,id:number){
      return this._http.put<any>("http://localhost:3000/posts/"+id,data).pipe(map((res:any)=>{
      return res;

    }))
    
}
// delete Restaurent using delete method
deleteRestaurent(id:number){
  return this._http.delete<any>("http://localhost:3000/posts/"+id).pipe(map((res:any)=>{
    return res;

  }))  
  

}

}
