import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavBarComponent } from '../../layouts/nav-bar/nav-bar.component';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { BillToBankCommonService } from '../service/bill-to-bank-common.service';

@Component({
  selector: 'app-bill-to-bank',
  standalone: true,
  imports: [CommonModule, NavBarComponent, ReactiveFormsModule], // Ensure ReactiveFormsModule is imported
  templateUrl: './bill-to-bank.component.html',
  styleUrl: './bill-to-bank.component.css',
})
export class BillToBankComponent {
  collectionForm: FormGroup;
  totalCollection: number = 0;
  collectionsBySalesman: any[] = [];

  constructor(
    private fb: FormBuilder,
    private billToBankCommonService: BillToBankCommonService,
  ) {
    this.collectionForm = this.fb.group({
      collections: this.fb.array([this.createEntry()]),
    });
  }

  ngOnInit() {
    this.fetchCollectionsBySalesman();
  }

  // Getter for the form array
  get collections(): FormArray {
    return this.collectionForm.get('collections') as FormArray; // Use type assertion
  }

  // Function to create a new entry form group
  createEntry(): FormGroup {
    return this.fb.group({
      billNumber: ['', Validators.required],
      name: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
    });
  }

  // Function to add a new entry to the form
  addEntry(): void {
    this.collections.push(this.createEntry());
  }

  // Function to remove a specific entry
  removeEntry(index: number): void {
    if (this.collections.length > 1) {
      this.collections.removeAt(index);
      this.calculateTotal();
    }
  }

  // Function to handle form submission
  onSubmit(): void {
    if (this.collectionForm.valid) {
      const formValue = this.collectionForm.value.collections.map((entry: any) => ({
        billNumber: entry.billNumber,
        billName: entry.name,
        amountCollected: entry.amount,
        salesmanId: 1, // Replace with dynamic salesman ID
        salesmanName: 'John Doe',
        createdBy: 'admin',
        createTime : new Date,

      }));

      this.billToBankCommonService.createCollection(formValue).subscribe(
        (response) => {
          console.log('Collections created successfully', response);
          // Optionally clear the form or update the UI
          this.collectionForm.reset();
          this.collections.clear(); // Clear the form array
          this.addEntry(); // Add an initial entry after reset
        },
        (error) => {
          console.error('Error creating collections', error);
        },
      );
    }
  }

  // Function to get collections by salesman ID
  fetchCollectionsBySalesman(): void {
    const salesmanId = 3; // Replace with dynamic salesman ID if needed
    this.billToBankCommonService
      .getCollectionsBySalesmanId(salesmanId)
      .subscribe(
        (response: any[]) => {
          this.collectionsBySalesman = response;
          console.log('Collections fetched:', response);
        },
        (error) => {
          console.error('Error fetching collections', error);
        },
      );
  }

  // Function to calculate the total amount collected
  calculateTotal(): void {
    this.totalCollection = this.collections.controls
      .map((entry) => entry.get('amount')?.value) // Use optional chaining to avoid null errors
      .reduce((acc, amount) => acc + (amount || 0), 0); // Safely handle null or undefined values
  }
}
