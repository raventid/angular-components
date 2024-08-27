import { Component } from '@angular/core';
import { EditAccountComponent } from '../edit-account/edit-account.component';

@Component({
  selector: 'app-retirement',
  standalone: true,
  imports: [EditAccountComponent],
  template: `

<div class="manage-panel">
  <div class="header">
    <h2>Manage</h2>
    <button class="enquire-button">Enquire history</button>
  </div>
  <div class="info-grid">
    <div class="info-row">
      <div class="info-item">
      <div class="info-content">
        <span class="info-label">Creation date:</span>
        <span class="info-value">2019-01-18</span>
        </div>
      </div>
      <div class="info-item right-align">
        <div class="info-content">
          <span class="info-label">Investment amount:</span>
          <span class="info-value">TWD 50,000 <span class="sub-text">(per month)</span></span>
        </div>
        <button class="adjust-button">Adjust amount</button>
      </div>
    </div>
    <div class="info-row">
      <div class="info-item">
        <div class="info-content">
          <span class="info-label">Account number:</span>
          <span class="info-value">001077019304</span>
        </div>
        <span (click)="openPopup()" class="edit-icon">&#9998;</span>
      </div>
      <div class="info-item right-align">
        <span class="info-label">Accumulated investment amount:</span>
        <span class="info-value">TWD 50,000</span>
      </div>
    </div>
    <div class="info-row">
      <div class="info-item">
        <div class="info-content">
          <span class="info-label">Charge date:</span>
          <span class="info-value">1 of the month <span class="sub-text">(Next payment date: 2018-11-01)</span></span>
        </div>
        <span class="edit-icon">&#9998;</span>
      </div>
      <div class="info-item right-align">
        <div class="info-content">
          <span class="info-label">Current market value:</span>
          <span class="info-value">TWD 50,011</span>
        </div>
        <button class="redemption-button">Redemption</button>
      </div>
    </div>
    <div class="info-row">
      <div class="info-item">
        <div class="info-content">
          <span class="info-label">Status:</span>
          <span class="info-value">Monthly charge</span>
        </div>
        <button class="suspension-button">Suspension of investment</button>
      </div>
    </div>
  </div>
</div>

        <edit-account
        [isOpen]="isPopupOpen"
        (close)="closePopup()">
        </edit-account>
  `,
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
