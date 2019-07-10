import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  submitted = false;

  form = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required]
  });

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {}

  get usernameControl() {
    return this.form.get("username") as FormControl;
  }

  get passwordControl() {
    return this.form.get("password") as FormControl;
  }

  login(form: FormGroup) {
    this.submitted = true;
    const { value, valid } = form;
    if (valid) {
      console.log(form.value);
      this.authService.login(value.username, value.password).subscribe(data =>{
        console.log(data);
      })
    }
  }
}
