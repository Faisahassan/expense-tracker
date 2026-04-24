import { Injectable, signal } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from './firebase.config';

export interface Category {
  id?: string;
  name: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories = signal<Category[]>([]);

  categoryCollection = collection(db, 'categories');

  // READ (real-time)
  loadCategories() {
    onSnapshot(this.categoryCollection, snapshot => {
      const data = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as Category[];

      this.categories.set(data);
      console.log('🔥 CATEGORIES:', data);
    });
  }

  // CREATE
  async addCategory(c: Category) {
    await addDoc(this.categoryCollection, c);
  }

  // UPDATE
  async updateCategory(id: string, c: Partial<Category>) {
    const ref = doc(db, 'categories', id);
    await updateDoc(ref, c);
  }

  // DELETE
  async deleteCategory(id: string) {
    const ref = doc(db, 'categories', id);
    await deleteDoc(ref);
  }
}