import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon.model';
import { User } from 'src/app/models/user.model';
import { CurrentPageService } from 'src/app/services/current-page.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css'],
})
export class ProfilePage {
  get user(): User | undefined {
    return this.userService.user;
  }
  get caughtPokemons(): Pokemon[] {
    if (this.userService.user) {
      return this.userService.user.pokemon;
    }
    return [];
  }

  constructor(
    private userService: UserService,
    private currentPageService: CurrentPageService,
    private readonly router: Router
  ) {}

  logOut(): void {
    if (this.userService.user !== undefined) {
      this.userService.user = undefined;
      sessionStorage.removeItem('trainer-user');
      this.currentPageService.updateCurrentPage(true);
      this.router.navigateByUrl('/');
    }
  }
}
