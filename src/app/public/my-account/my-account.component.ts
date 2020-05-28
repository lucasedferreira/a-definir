import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services';
import { User } from '../../_models';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  user: User;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(user => {
      this.user = user;
      console.log('this.user', this.user);
    });
  }

}
