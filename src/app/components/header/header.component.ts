import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { CurrentPageService } from 'src/app/services/current-page.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  get user(): User | undefined {
    return this.userService.user;
  }

  constructor(private readonly userService: UserService) {}
}
