import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { CurrentPageService } from 'src/app/services/current-page.service';
import { UserService } from 'src/app/services/user.service';
import { InfoCardButtonComponent } from '../info-card-button/info-card-button.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  get user(): User | undefined {
    return this.userService.user;
  }

  constructor(
    private readonly userService: UserService,
    private currentPageService: CurrentPageService
  ) {}

  onProfileClick() {
    this.currentPageService.updateCurrentPage(false);
  }
  onCatalogueClick() {
    this.currentPageService.updateCurrentPage(true);
  }
}
