import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user.model';

const { apiUsers , apiKey} = environment;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //Dependency Injection.
  constructor(private readonly http: HttpClient) { }

  public login(username: string): Observable<User>{
    return this.checkUsername(username)
      .pipe(
        switchMap((user: User | undefined)=>{
          if(user === undefined){
            return this.createUser(username);
          }
          return of(user)
        })
      )
  }
  //check user exist
  private checkUsername(username: string): Observable<User | undefined>{
    return this.http.get<User[]>(`${apiUsers}?username=${username}`)
    .pipe(
      //RxJs Operators
      map((response:User[]) => response.pop())
    )
  }

  //create a user
  private createUser(username: string): Observable<User> {
    const user = {
      username,
      pokemon: []
    };

    const headers = new HttpHeaders({
      "Content-type": "application/json",
      "x-api-key": "apiKey"
    });

    return this.http.post<User>(apiUsers, user,{
      headers
    })

  }
}
