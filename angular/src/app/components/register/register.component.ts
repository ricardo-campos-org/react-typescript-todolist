import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { RegisterCredentials } from '../../models/credentials';
import { interval, Subscription } from 'rxjs';

interface RegisterForm {
  email: FormControl<string>;
  password: FormControl<string>;
  passwordAgain: FormControl<string>;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerForm: FormGroup<RegisterForm>;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  secondsLeft: number = 30;
  isResendEnabled: boolean = false;
  isRegistered: boolean = false;
  private timerSubscription?: Subscription;
  registeredEmail: string = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.registerForm = this.fb.group<RegisterForm>({
      email: this.fb.control('', { validators: [Validators.required, Validators.email], nonNullable: true }),
      password: this.fb.control('', { validators: [Validators.required, Validators.minLength(6)], nonNullable: true }),
      passwordAgain: this.fb.control('', { validators: [Validators.required, Validators.minLength(6)], nonNullable: true })
    });
  }
  
  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Form is invalid. Please review';
      return;
    }

    this.errorMessage = null;

    const credentials: RegisterCredentials = this.registerForm.value as RegisterCredentials;

    this.apiService.register(credentials).subscribe({
      next: () => {
        // Save the email for potential resend
        this.registeredEmail = credentials.email;
        
        // Show success message
        this.successMessage = 'Please confirm your email before proceeding.';
        this.isRegistered = true;
        
        // Reset form but keep email
        this.registerForm.controls.password.reset();
        this.registerForm.controls.passwordAgain.reset();
        
        // Start countdown
        this.startCountdown();
      },
      error: (err) => {
        if ('error' in err && 'status' in err) {
          const { error, status } = err;

          if ('message' in error) {
            this.errorMessage = `${status} - ${error.error}! ${error.message}`;
          }
        }
      }
    });
  }

  startCountdown(): void {
    // Reset timer state
    this.secondsLeft = 30;
    this.isResendEnabled = false;
    
    // Clear any existing subscription
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    
    // Create new timer
    this.timerSubscription = interval(1000).subscribe(() => {
      this.secondsLeft--;
      
      if (this.secondsLeft <= 0) {
        this.isResendEnabled = true;
        this.timerSubscription?.unsubscribe();
      }
    });
  }
  
  resendConfirmation(): void {
    if (!this.isResendEnabled || !this.registeredEmail) {
      return;
    }
    
    this.apiService.resendEmailConfirmation({ email: this.registeredEmail }).subscribe({
      next: () => {
        this.successMessage = 'Confirmation email re-sent! Please check your inbox (including spam folder).';
        this.startCountdown();
      },
      error: (err) => {
        if ('error' in err && 'status' in err) {
          const { error } = err;
          if ('message' in error) {
            this.errorMessage = error.message;
          } else {
            this.errorMessage = 'Failed to resend confirmation email.';
          }
        }
      }
    });
  }
  
  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
