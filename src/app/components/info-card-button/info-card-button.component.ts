import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-info-card-button',
  templateUrl: './info-card-button.component.html',
  styleUrls: ['./info-card-button.component.css'],
})
export class InfoCardButtonComponent {
  @Input() pokemonName: string = '';

  get loading(): boolean {
    return this.trainerService.loading;
  }

  constructor(private readonly trainerService: TrainerService) {}

  onButtonClick(): void {
    //Add the pokemon to trainer
    this.trainerService.addToTrainer(this.pokemonName).subscribe({
      next: (response: any) => {
        console.log('Next', response);
      },
      error: (error: HttpErrorResponse) => {
        console.log('Error', error);
      },
    });
  }
}
