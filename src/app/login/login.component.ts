// login.component.ts

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(private fb: FormBuilder, public authService: AuthService, private router: Router) {
        this.loginForm = this.fb.group({
            identifier: ['', Validators.required],  // Änderung von 'email' zu 'identifier'
            password: ['', Validators.required]
        });
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            const identifier = this.loginForm.get('identifier')?.value;
            const password = this.loginForm.get('password')?.value;

            this.authService.login(identifier, password).subscribe(
                response => {

                    const userId = response.user._id; // Die Eigenschaft hängt von der Struktur Ihrer Antwort ab
                    if (userId) {
                        AuthService.userId.next(userId);
                        localStorage.setItem('userId', userId);
                    }

                    this.router.navigate(['/'])
                        .then(() => console.log('navigate to /'))
                        .catch(err => console.error('error navigating to /', err));

                    AuthService.isLoggedIn.next(true);
                    localStorage.setItem('isLoggedIn', 'true');
                },
                error => {
                    console.error('Login failed', error);
                    AuthService.isLoggedIn.next(false);
                    localStorage.setItem('isLoggedIn', 'false');
                }
            );

        }
    }

    ngOnInit(): void {
    }
}

