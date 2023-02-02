import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

const { apiUserURL, apiKey } = environment;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _loading: boolean = false;

  get loading(): boolean {
    return this._loading;
  }

  //Dependency Injection.
  constructor(private readonly http: HttpClient) {}

  public login(username: string): Observable<User> {
    this._loading = true;
    return this.checkUsername(username).pipe(
      finalize(() => {
        this._loading = false;
      }),
      switchMap((user: User | undefined) => {
        if (user === undefined) {
          return this.createUser(username);
        }
        return of(user);
      })
    );
  }
  //check if user exist
  private checkUsername(username: string): Observable<User | undefined> {
    return this.http.get<User[]>(`${apiUserURL}?username=${username}`).pipe(
      //RxJs Operators
      map((response: User[]) => response.pop())
    );
  }

  //create a user
  private createUser(username: string): Observable<User> {
    const user = {
      username,
      pokemon: [],
    };

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'x-api-key': apiKey,
    });

    return this.http.post<User>(apiUserURL, user, {
      headers,
    });
  }
}
