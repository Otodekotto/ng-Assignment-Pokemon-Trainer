import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { TrainerService } from 'src/app/services/trainer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-info-card-button',
  templateUrl: './info-card-button.component.html',
  styleUrls: ['./info-card-button.component.css'],
})
export class InfoCardButtonComponent implements OnInit {
  private loading: boolean = false;

  public isCaught: boolean = false;
  public onCatalogue: boolean = false;
  @Input() pokemonName: string = '';

  constructor(
    private readonly userService: UserService,
    private readonly trainerService: TrainerService
  ) {}

  ngOnInit(): void {
    this.isCaught = this.userService.inCaughtPokemons(this.pokemonName);
  }

  onButtonClick(): void {
    this.loading = true;
    //Add the pokemon to trainer
    this.trainerService.addToUpdatedCaught(this.pokemonName).subscribe({
      next: (user: User) => {
        this.loading = false;
        this.isCaught = this.userService.inCaughtPokemons(this.pokemonName);
      },
      error: (error: HttpErrorResponse) => {
        console.log('Error', error);
      },
    });
  }
}
