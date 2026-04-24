import { Injectable, signal } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from './firebase.config';

export interface Budget {
  id?: string;
  category: string;
  limit: number;
  month: string; // 🔥 NEW
}

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  budgets = signal<Budget[]>([]);

  budgetCollection = collection(db, 'budgets');

  loadBudgets() {
    onSnapshot(this.budgetCollection, snapshot => {
      const data = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as Budget[];

      this.budgets.set(data);
      console.log('🔥 BUDGETS:', data);
    });
  }

  async addBudget(b: Budget) {
    await addDoc(this.budgetCollection, b);
  }

  async updateBudget(id: string, b: Partial<Budget>) {
    const ref = doc(db, 'budgets', id);
    await updateDoc(ref, b);
  }

  async deleteBudget(id: string) {
    const ref = doc(db, 'budgets', id);
    await deleteDoc(ref);
  }
}