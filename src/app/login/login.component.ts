import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb:FormBuilder, private userService: UserService) { }

  login() {
    if (this.loginForm.valid) {
      // run the code to actually log the person in through the userService from info passed in the template
      this.userService.login(this.loginForm.get("username").value, this.loginForm.get("password").value);
    }
  }

  ngOnInit(): void {
    // Builds the form here
    this.loginForm = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(16)])]

    })
  }
  
}
