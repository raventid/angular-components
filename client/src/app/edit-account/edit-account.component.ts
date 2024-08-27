import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'edit-account',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div *ngIf="isOpen" class="popup-container">
      <div class="overlay" (click)="closePopup()"></div>
      <div class="popup">
        <h2>Change account number:</h2>
        <div class="form-group">
          <label for="accountSelect">Please select your debit account number:</label>
          <div class="account-select">
            <select>
              <option>TWD</option>
            </select>
            <select id="accountSelect" [(ngModel)]="selectedAccount" (change)="onAccountSelect()">
              <option [ngValue]="null" disabled>Select an account</option>
              <option *ngFor="let account of accounts" [ngValue]="account">
                {{ account }}
              </option>
            </select>
            <span *ngIf="selectedAccount !== null" class="balance">
              Account balance: {{ selectedAccount | number }}
            </span>
          </div>
        </div>
        <p *ngIf="errorMessage" class="error-message">{{ errorMessage }}</p>
        <div class="buttons">
          <button class="cancel" (click)="closePopup()">Cancel</button>
          <button class="determine" (click)="confirmSelection()" [disabled]="!selectedAccount">Determine</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./edit-account.component.css'],
})
export class EditAccountComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  accounts: number[] = [];
  selectedAccount: number | null = null;
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchAccounts();
  }

  fetchAccounts() {
    this.http.get<number[]>('http://localhost:3000/accounts').subscribe({
      next: (data) => {
        this.accounts = data;
      },
      error: (error) => {
        console.error('Error fetching accounts', error);
        this.errorMessage = 'Error fetching accounts. Please try again.';
      }
    });
  }

  onAccountSelect() {
    // The balance is now automatically displayed in the template
    // using the selectedAccount value
  }

  confirmSelection() {
    if (this.selectedAccount) {
      this.http.post('http://localhost:3000/select-account', { accountNumber: this.selectedAccount }).subscribe({
        next: (response: any) => {
          console.log(`Account ${this.selectedAccount} selected`);
          this.closePopup();
        },
        error: (error) => {
          console.error('Error selecting account', error);
          this.errorMessage = 'Error selecting account. Please try again.';
        }
      });
    }
  }

  closePopup() {
    this.close.emit();
  }
}
