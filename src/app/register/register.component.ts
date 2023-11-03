// register.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup;  // Das Ausrufezeichen entfernt die Optionalität

  constructor(private fb: FormBuilder, public authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],  // Validators für username hinzugefügt
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;  // username hinzugefügt
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.authService.register(username, email, password).subscribe({
        next: (response) => {
          console.log('Registrierung erfolgreich:', response);
          // Zeige eine Erfolgsmeldung
          window.alert('Registrierung erfolgreich. Du wirst jetzt zur Login-Seite weitergeleitet.');
          // Weiterleitung zur Login-Seite
          this.router.navigate(['/login']);
        },
        error: (error) => {
          // Fehler bei der Registrierung
          console.error('Registrierung fehlgeschlagen:', error);
          // Fehlermeldung anzeigen oder weitere Aktionen
        }
      });
    }
  }
}
