import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavBarComponent } from "../../layouts/nav-bar/nav-bar.component";
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-bill-to-bank',
  standalone: true,
  imports: [CommonModule, NavBarComponent, ReactiveFormsModule], // Ensure ReactiveFormsModule is imported
  templateUrl: './bill-to-bank.component.html',
  styleUrl: './bill-to-bank.component.css'
})
export class BillToBankComponent {

  collectionForm: FormGroup;
  totalCollection: number = 0;

  constructor(private fb: FormBuilder) {
    this.collectionForm = this.fb.group({
      collections: this.fb.array([this.createEntry()])
    });
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
      amount: [0, [Validators.required, Validators.min(1)]]
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
      console.log('Form Submitted', this.collectionForm.value);
      this.calculateTotal();
      // Perform any additional actions (e.g., saving data to a server)
    }
  }

  // Function to calculate the total amount collected
  calculateTotal(): void {
    this.totalCollection = this.collections.controls
      .map(entry => entry.get('amount')?.value) // Use optional chaining to avoid null errors
      .reduce((acc, amount) => acc + (amount || 0), 0); // Safely handle null or undefined values
  }

}
