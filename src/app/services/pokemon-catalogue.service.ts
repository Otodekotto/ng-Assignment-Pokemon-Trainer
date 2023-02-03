import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Pokemon } from '../models/pokemon.model';
import { StorageUtil } from '../utils/storage.util';

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
    if (this._pokemon.length > 0 || this.loading) {
      return;
    }

    this._loading = true;
    if (StorageUtil.storageRead(StorageKeys.PokemonCatalogue) === undefined) {
      this.http
        .get<Pokemon[]>(
          'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
        )
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
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' +
                id[6] +
                '.png';
            });
            this._pokemon = pokemons.results;
            console.log(this._pokemon);
            StorageUtil.storageSave(
              StorageKeys.PokemonCatalogue,
              this._pokemon
            );
            console.log('API DATA');
          },
          error: (error: HttpErrorResponse) => {
            this._error = error.message;
          },
        });
    } else {
      let storagePokemonData: any = StorageUtil.storageRead(
        StorageKeys.PokemonCatalogue
      );
      this._loading = false;
      this._pokemon = storagePokemonData;
      console.log('LocalStorage');
    }
  }

  public pokemonById(name: string): Pokemon | undefined {
    return this._pokemon.find((pokemon: Pokemon) => pokemon.name === name);
  }
}
