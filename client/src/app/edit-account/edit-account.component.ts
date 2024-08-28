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
  @Output() selectedAccountChange = new EventEmitter<number | null>();

  private _selectedAccount: number | null = null;
  get selectedAccount(): number | null {
    return this._selectedAccount;
  }
  set selectedAccount(value: number | null) {
    this._selectedAccount = value;
  }

  accounts: number[] = [];
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchAccounts();
  }

  fetchAccounts() {
    this.http.get<number[]>('http://localhost:3000/accounts').subscribe({
      next: (data) => {
        this.accounts = data;
        this.selectedAccount = this.accounts.values().next().value;
        this.selectedAccountChange.emit(this.selectedAccount);
      },
      error: (error) => {
        console.error('Error fetching accounts', error);
        this.errorMessage = 'Error fetching accounts. Please try again.';
      }
    });
  }

  onAccountSelect() {
    console.log(`Account changed in select: ${this.selectedAccount}`);
  }

  confirmSelection() {
    if (this.selectedAccount) {
      this.http.post('http://localhost:3000/select-account', { accountNumber: this.selectedAccount }).subscribe({
        next: (response: any) => {
          console.log(`Account ${this.selectedAccount} selected`);
          this.selectedAccountChange.emit(this.selectedAccount);
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
