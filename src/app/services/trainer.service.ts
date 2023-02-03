import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { User } from '../models/user.model';
import { PokemonCatalogueService } from './pokemon-catalogue.service';
import { UserService } from './user.service';

const { apiKey, apiUserURL } = environment;

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  constructor(
    private http: HttpClient,
    private readonly pokemonService: PokemonCatalogueService,
    private readonly userService: UserService
  ) {}
  //get pokemon based on id

  //patch request with the userId and the pokemon
  public addToUpdatedCaught(pokemonName: string): Observable<User> {
    if (!this.userService.user) {
      throw new Error('add to fav: no user');
    }
    const user: User = this.userService.user;
    const pokemon: Pokemon | undefined =
      this.pokemonService.pokemonById(pokemonName);

    if (!pokemon) {
      throw new Error('no pokemon with name: ' + pokemonName);
    }

    if (this.userService.inCaughtPokemons(pokemonName)) {
      this.userService.removeFromCaught(pokemonName);
    } else {
      this.userService.addToCaught(pokemon);
    }

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'x-api-key': apiKey,
    });

    return this.http
      .patch<User>(
        `${apiUserURL}/${user.id}`,
        {
          pokemon: [...user.pokemon],
        },
        {
          headers,
        }
      )
      .pipe(
        tap((updatedUser: User) => {
          this.userService.user = updatedUser;
        })
      );
  }
}
