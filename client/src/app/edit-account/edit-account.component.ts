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
  styles: [`
    .popup-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }
    .popup {
      background-color: white;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      max-width: 600px;
      width: 90%;
      z-index: 1001;
    }
    h2 {
      margin-top: 0;
      color: #333;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
    }
    .form-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      color: #666;
    }
    .account-select {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
    }
    select {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }
    .buttons {
      text-align: right;
    }
    button {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      margin-left: 10px;
    }
    .cancel {
      background-color: #f0f0f0;
      color: #333;
    }
    .determine {
      background-color: #4CAF50;
      color: white;
    }
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .balance {
      color: #4CAF50;
      font-weight: bold;
    }
    .error-message {
      color: #ff0000;
      margin-bottom: 15px;
    }
    @media (max-width: 480px) {
      .account-select {
        flex-direction: column;
        align-items: flex-start;
      }
      select {
        width: 100%;
      }
      .balance {
        margin-top: 5px;
      }
    }
  `]
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
