import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService, Category } from '../category.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
   templateUrl: './category.html',
  styleUrl: './category.css'
})
export class CategoryComponent {

  categoryService = inject(CategoryService);

  // 🔥 NEW fields
  name = signal<string>('');
  color = signal<string>('#000000');


  selectedCategory = signal<Category | null>(null);

  ngOnInit() {
    this.categoryService.loadCategories();
  }

  // ✅ CREATE
  addCategory() {
    const c: Category = {
      name: this.name(),
      color: this.color(),
    };

    this.categoryService.addCategory(c);
    this.resetForm();
  }

  // ✅ SELECT (for edit)
  selectCategory(c: Category) {
    this.selectedCategory.set(c);
    this.name.set(c.name);
    this.color.set(c.color);
  }

  // ✅ UPDATE
  updateCategory() {
    const c = this.selectedCategory();
    if (!c) return;

    this.categoryService.updateCategory(c.id!, {
      name: this.name(),
      color: this.color(),
    });

    this.resetForm();
  }

  // ✅ RESET
  resetForm() {
    this.name.set('');
    this.color.set('#000000');
    this.selectedCategory.set(null);
  }
}