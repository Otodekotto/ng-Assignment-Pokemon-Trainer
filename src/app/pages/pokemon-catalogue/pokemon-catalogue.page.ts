import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { CurrentPageService } from 'src/app/services/current-page.service';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';

@Component({
  selector: 'app-pokemon-catalogue',
  templateUrl: './pokemon-catalogue.page.html',
  styleUrls: ['./pokemon-catalogue.page.css'],
})
export class PokemonCataloguePage implements OnInit {
  public onCatalogue: boolean = true;
  get pokemons(): Pokemon[] {
    return this.pokemonCatalogueService.pokemons;
  }

  get loading(): boolean {
    return this.pokemonCatalogueService.loading;
  }

  constructor(
    private readonly pokemonCatalogueService: PokemonCatalogueService,
    private currentPageService: CurrentPageService
  ) {
    this.currentPageService.updateCurrentPage(true);
  }

  ngOnInit(): void {
    this.pokemonCatalogueService.findAllPokemon();
  }
}
