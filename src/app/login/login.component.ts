import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  usernameFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
      ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.email,  // WILL HAVE TO GET THIS FIGURED OUT BEFORE LONG
  ]);

}
