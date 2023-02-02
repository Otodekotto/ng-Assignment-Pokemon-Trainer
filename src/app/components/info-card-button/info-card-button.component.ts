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
  public isCaught: boolean = false;

  @Input() pokemonName: string = '';

  get loading(): boolean {
    return this.trainerService.loading;
  }

  constructor(
    private userService: UserService,
    private readonly trainerService: TrainerService
  ) {}

  ngOnInit(): void {
    this.isCaught = this.userService.inPokemons(this.pokemonName);
  }

  onButtonClick(): void {
    //Add the pokemon to trainer
    this.trainerService.addToTrainer(this.pokemonName).subscribe({
      next: (user: User) => {
        this.isCaught = this.userService.inPokemons(this.pokemonName);
      },
      error: (error: HttpErrorResponse) => {
        console.log('Error', error);
      },
    });
  }
}
