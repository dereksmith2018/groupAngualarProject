import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from 'app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  user;
  public loginForm: FormGroup;
  private subscription: Subscription[] = [];
  private returnUrl: string;
  public email: string;
  password: string;
  private isLoggedIn: Boolean;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.authService.currentUser.subscribe(user => {
      if (user == null) {
        this.isLoggedIn = false;
        this.router.navigate(["/login"]); 
      } else {
        this.isLoggedIn = true;
        this.user = this.email;
        this.router.navigate(["/profile/"]); 
      }
      console.log(this.user);
    })
}

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/profile/{{}}';
  }

  login(userEmail: string, userPassword: string) {
    this.authService.login(userEmail, userPassword);
    
  }

  authStatus() {
    if(this.isLoggedIn == false){
      alert("Login failed. Please try again.");
    }
    else {
      this.router.navigate(['/profile']);
    }
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
