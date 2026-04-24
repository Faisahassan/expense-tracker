import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TransactionService, Transaction } from '../transaction.service';
import { CategoryService } from '../category.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css'
})
export class TransactionsComponent {

  transactionService = inject(TransactionService);
  categoryService = inject(CategoryService);

  // ================= FORM =================
  amount = signal<number>(0);
  category = signal<string>('');
  date = signal<string>('');
  notes = signal<string>('');
  type = signal<'income' | 'expense'>('expense');

  selectedTransaction = signal<Transaction | null>(null);

  // ================= SEARCH =================
  search = signal<string>('');

  // ================= FILTERS =================
  showFilters = signal<boolean>(false);

  filterCategory: string = '';
  filterMin: number = 0;
  filterMax: number = 0;
  filterStartDate: string = '';
  filterEndDate: string = '';

  ngOnInit() {
    this.transactionService.loadTransactions();
    this.categoryService.loadCategories();
  }

  // ================= CREATE =================
  addTransaction() {
    const selectedCategory = this.categoryService.categories()
      .find(c => c.name === this.category());

    if (!selectedCategory) return;

    const t: Transaction = {
      amount: this.amount(),
      category: selectedCategory.name,
      categoryColor: selectedCategory.color,
      date: this.date(),
      notes: this.notes(),
      type: this.type()
    };

    this.transactionService.addTransaction(t);
    this.resetForm();
  }

  // ================= SELECT =================
  selectTransaction(t: Transaction) {
    this.selectedTransaction.set(t);
    this.amount.set(t.amount);
    this.category.set(t.category);
    this.date.set(t.date);
    this.notes.set(t.notes);
    this.type.set(t.type);
  }

  // ================= UPDATE =================
  updateTransaction() {
    const t = this.selectedTransaction();
    if (!t) return;

    const selectedCategory = this.categoryService.categories()
      .find(c => c.name === this.category());

    if (!selectedCategory) return;

    this.transactionService.updateTransaction(t.id!, {
      amount: this.amount(),
      category: selectedCategory.name,
      categoryColor: selectedCategory.color,
      date: this.date(),
      notes: this.notes(),
      type: this.type()
    });

    this.resetForm();
  }

  // ================= RESET =================
  resetForm() {
    this.amount.set(0);
    this.category.set('');
    this.date.set('');
    this.notes.set('');
    this.type.set('expense');
    this.selectedTransaction.set(null);
  }

  // ================= FILTER LOGIC =================
  getFilteredTransactions() {
    return this.transactionService.transactions().filter(t => {

      // 🔍 SEARCH
      if (
        this.search() &&
        !t.category.toLowerCase().includes(this.search().toLowerCase()) &&
        !t.notes.toLowerCase().includes(this.search().toLowerCase())
      ) return false;

      // CATEGORY
      if (this.filterCategory && t.category !== this.filterCategory) return false;

      // AMOUNT
      if (this.filterMin && t.amount < this.filterMin) return false;
      if (this.filterMax && t.amount > this.filterMax) return false;

      // DATE
      if (this.filterStartDate && t.date < this.filterStartDate) return false;
      if (this.filterEndDate && t.date > this.filterEndDate) return false;

      return true;
    });
  }
}