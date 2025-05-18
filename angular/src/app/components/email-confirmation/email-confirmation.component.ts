import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-email-confirmation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './email-confirmation.component.html'
})
export class EmailConfirmationComponent implements OnInit {
  status: string | null = 'loading';
  errorMessage: string | null = null;
  identification: string | null = null;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get a single query parameter
    this.route.queryParamMap.subscribe(params => {
      this.identification = params.get('identification');
      console.log('Identification:', this.identification);
      
      // Now you can use the token to confirm the email
      if (this.identification) {
        this.confirmEmail();
      } else {
        this.status = 'error';
        this.errorMessage = 'Wrong or missing identification token.';
      }
    });
  }

  private confirmEmail(): void {
    this.apiService.confirmEmail(this.identification!).subscribe({
      next: () => {
        this.status = 'success';
      },
      error: (error) => {
        this.status = 'error';
        this.errorMessage = error.message || 'Failed to confirm email';
      }
    });
  }
}
