import { Injectable, signal } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from './firebase.config';

export interface Transaction {
  id?: string;
  amount: number;
  category: string;

  // 🔥 NEW (IMPORTANT)
  categoryColor: string;


  date: string;
  notes: string;

  type: 'income' | 'expense';
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  transactions = signal<Transaction[]>([]);

  transactionCollection = collection(db, 'transactions');

  // ✅ READ (REAL-TIME)
  loadTransactions() {
    onSnapshot(this.transactionCollection, snapshot => {
      const data = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as Transaction[];

      this.transactions.set(data);
      console.log('🔥 TRANSACTIONS:', data);
    });
  }

  // ✅ CREATE
  async addTransaction(t: Transaction) {
    await addDoc(this.transactionCollection, t);
  }

  // ✅ UPDATE
  async updateTransaction(id: string, t: Partial<Transaction>) {
    const ref = doc(db, 'transactions', id);
    await updateDoc(ref, t);
  }

  // ✅ DELETE
  async deleteTransaction(id: string) {
    const ref = doc(db, 'transactions', id);
    await deleteDoc(ref);
  }
}