import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
const { apiPokemonURL } = environment;

@Injectable({
  providedIn: 'root',
})
export class PokemonCatalogueService {
  private _pokemon: Pokemon[] = [];
  private _error: string = '';
  private _loading: boolean = false;

  get pokemons(): Pokemon[] {
    return this._pokemon;
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  constructor(private readonly http: HttpClient) {}

  public findAllPokemon(): void {
    this._loading = true;
    this.http
      .get<Pokemon[]>(apiPokemonURL)
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe({
        next: (pokemons: any) => {
          pokemons.results.map((pokemon: any) => {
            let id = pokemon.url.split('/');
            pokemon.sprite =
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/' +
              id[6] +
              '.png';
          });
          this._pokemon = pokemons.results;
          console.log(this._pokemon);
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        },
      });
  }
}
