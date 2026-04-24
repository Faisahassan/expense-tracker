import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BudgetService, Budget } from '../budget.service';
import { CategoryService } from '../category.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
   templateUrl: './budget.html',
  styleUrl: './budget.css'
})
export class BudgetComponent {

  budgetService = inject(BudgetService);
  categoryService = inject(CategoryService);

  category = signal<string>('');
  limit = signal<number>(0);
  month = signal<string>(''); // 🔥 NEW

  selectedBudget = signal<Budget | null>(null);

  ngOnInit() {
    this.budgetService.loadBudgets();
    this.categoryService.loadCategories();
  }

  addBudget() {
    const b: Budget = {
      category: this.category(),
      limit: this.limit(),
      month: this.month()
    };

    this.budgetService.addBudget(b);
    this.resetForm();
  }

  selectBudget(b: Budget) {
    this.selectedBudget.set(b);
    this.category.set(b.category);
    this.limit.set(b.limit);
    this.month.set(b.month);
  }

  updateBudget() {
    const b = this.selectedBudget();
    if (!b) return;

    this.budgetService.updateBudget(b.id!, {
      category: this.category(),
      limit: this.limit(),
      month: this.month()
    });

    this.resetForm();
  }

  resetForm() {
    this.category.set('');
    this.limit.set(0);
    this.month.set('');
    this.selectedBudget.set(null);
  }
}