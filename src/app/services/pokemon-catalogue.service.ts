import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Pokemon } from '../models/pokemon.model';
import { StorageUtil } from '../utils/storage.util';

const { apiAllPokemonURL, apiPokemonSprite } = environment;

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

  //get all pokemon from localstorage if local storage doesnt exist, get from Api
  public findAllPokemon(): void {
    if (this._pokemon.length > 0 || this.loading) {
      return;
    }

    this._loading = true;
    if (StorageUtil.storageRead(StorageKeys.PokemonCatalogue) === undefined) {
      this.http
        .get<Pokemon[]>(apiAllPokemonURL)
        .pipe(
          finalize(() => {
            this._loading = false;
          })
        )
        .subscribe({
          next: (pokemons: any) => {
            pokemons.results.map((pokemon: any) => {
              let id = pokemon.url.split('/');
              pokemon.sprite = apiPokemonSprite + id[6] + '.png';
            });
            this._pokemon = pokemons.results;
            StorageUtil.storageSave(
              StorageKeys.PokemonCatalogue,
              this._pokemon
            );
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
    }
  }

  //find pokemon by name
  public pokemonByName(name: string): Pokemon | undefined {
    return this._pokemon.find((pokemon: Pokemon) => pokemon.name === name);
  }
}
