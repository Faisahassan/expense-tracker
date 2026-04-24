import { Component, inject, computed, AfterViewInit } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { BudgetService } from '../budget.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements AfterViewInit {

  transactionService = inject(TransactionService);
  budgetService = inject(BudgetService);

  // ✅ FIX (for Object.keys in HTML)
  objectKeys = Object.keys;

  ngOnInit() {
    this.transactionService.loadTransactions();
    this.budgetService.loadBudgets();
  }

  // ✅ TOTAL INCOME
  totalIncome = computed(() => {
    return this.transactionService.transactions()
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  });

  // ✅ TOTAL EXPENSE
  totalExpense = computed(() => {
    return this.transactionService.transactions()
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  });

  // ✅ BALANCE
  balance = computed(() => {
    return this.totalIncome() - this.totalExpense();
  });

  // 🔥 ALERTS
  alerts = computed(() => {
    const transactions = this.transactionService.transactions();
    const budgets = this.budgetService.budgets();

    return budgets.map(b => {
      const spent = transactions
        .filter(t => t.category === b.category && t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      const percent = (spent / b.limit) * 100;

      return {
        category: b.category,
        spent,
        limit: b.limit,
        percent,
        status:
          percent >= 100 ? 'exceeded' :
          percent >= 80 ? 'warning' :
          'ok'
      };
    });
  });

  // 🔥 CATEGORY SPENDING (PIE)
  categorySpending = computed(() => {
    const data: any = {};

    this.transactionService.transactions()
      .filter(t => t.type === 'expense')
      .forEach(t => {
        data[t.category] = (data[t.category] || 0) + t.amount;
      });

    return data;
  });

  // 🔥 CHARTS
  ngAfterViewInit() {
    setTimeout(() => this.loadCharts(), 500);
  }

  loadCharts() {
    const categoryData = this.categorySpending();

    // PIE CHART
    new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: Object.keys(categoryData),
        datasets: [{
          data: Object.values(categoryData)
        }]
      }
    });

    // BAR CHART
    new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['Income', 'Expense'],
        datasets: [{
          data: [this.totalIncome(), this.totalExpense()]
        }]
      }
    });
  }
}