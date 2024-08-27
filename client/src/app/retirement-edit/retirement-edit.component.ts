import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface RetirementData {
  age: number;
  savings: number;
  monthlyContribution: number;
}

@Component({
  selector: 'app-retirement-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div *ngIf="isOpen" class="popup-container">
      <div class="overlay" (click)="closePopup()"></div>
      <div class="popup">
        <h2>Edit Retirement Plan</h2>
        <form (ngSubmit)="onSubmit()">
          <div>
            <label for="age">Retirement Age:</label>
            <input type="number" id="age" name="age" [(ngModel)]="formData.age" required>
          </div>
          <div>
            <label for="savings">Current Savings ($):</label>
            <input type="number" id="savings" name="savings" [(ngModel)]="formData.savings" required>
          </div>
          <div>
            <label for="monthlyContribution">Monthly Contribution ($):</label>
            <input type="number" id="monthlyContribution" name="monthlyContribution" [(ngModel)]="formData.monthlyContribution" required>
          </div>
          <button type="submit" [disabled]="isSubmitting">{{ isSubmitting ? 'Submitting...' : 'Save Changes' }}</button>
          <button type="button" (click)="closePopup()">Cancel</button>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./retirement-edit.component.css']
})
export class RetirementEditComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Input() initialData?: RetirementData;
  @Output() close = new EventEmitter<void>();
  @Output() dataUpdated = new EventEmitter<RetirementData>();

  formData: RetirementData = {
    age: 65,
    savings: 0,
    monthlyContribution: 0
  };

  isSubmitting = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (this.initialData) {
      this.formData = { ...this.initialData };
    }
  }

  closePopup() {
    this.close.emit();
  }

  onSubmit() {
    this.isSubmitting = true;
    // Replace with your actual API endpoint
    this.http.post<RetirementData>('https://api.example.com/retirement-plan', this.formData)
      .subscribe({
        next: (response) => {
          console.log('Data submitted successfully', response);
          this.dataUpdated.emit(response);
          this.closePopup();
        },
        error: (error) => {
          console.error('Error submitting data', error);
          // Handle error (e.g., show error message to user)
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
  }
}
