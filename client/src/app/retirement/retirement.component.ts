import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditAccountComponent } from '../edit-account/edit-account.component';

@Component({
  selector: 'app-retirement',
  standalone: true,
  imports: [CommonModule, EditAccountComponent],
  templateUrl: './retirement.component.html',
  styleUrls: ['./retirement.component.css'],
})
export class RetirementComponent {
  isPopupOpen = false;
  selectedAccount : number | null = null;

  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  ngOnInit() {
    // If you need to perform any actions with the initial selectedAccount value
    console.log('Initial selected account:', this.selectedAccount);
  }

  onSelectedAccountChange(account: number | null) {
    this.selectedAccount = account;
    console.log('Selected account in management panel:', this.selectedAccount);
  }
}
