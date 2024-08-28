import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'edit-account',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './edit-account.component.html',
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
