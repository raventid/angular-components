import { Component } from '@angular/core';
import { EditAccountComponent } from '../edit-account/edit-account.component';

@Component({
  selector: 'app-retirement',
  standalone: true,
  imports: [EditAccountComponent],
  templateUrl: './retirement.component.html',
  styleUrls: ['./retirement.component.css'],
})
export class RetirementComponent {
  isPopupOpen = false;
  currentRetirementPlan = {
    age: 65,
    savings: 100000,
    monthlyContribution: 500
  };

  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  onDataUpdated(newData: any) {
    this.currentRetirementPlan = newData;
    console.log('Retirement plan updated:', newData);
    // Update your app state or perform any other necessary actions
  }

  // Edit related logic
  showPopup : boolean = false;

  accounts: any[] = [
    { currency: 'TWD', number: '11218812045', balance: '199,999,999' }
  ];

  selectedAccount: string = '';

  openChangeAccountPopup() {
    this.showPopup = true;
  }

  changeAccountNumber() {
    // TODO: Implement the logic to change the account number
    console.log('Changing account number to:', this.selectedAccount);
    this.closePopup();
  }

  suspendInvestment() {
    // TODO: Implement the logic to suspend the investment
    console.log('Suspending investment');
  }
}
