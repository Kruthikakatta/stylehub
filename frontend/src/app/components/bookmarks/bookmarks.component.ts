import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from '../layout/page-header/page-header.component';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, PageHeaderComponent]
})
export class BookmarksComponent implements OnInit {
  bookmarks: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadBookmarks();
  }

  loadBookmarks() {
    const saved = localStorage.getItem('stylehub_bookmarks');
    if (saved) {
      this.bookmarks = JSON.parse(saved);
    } else {
      // Default bookmarks
      this.bookmarks = [
        {
          id: 1,
          title: 'Summer Breeze',
          category: 'Casual',
          imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
          savedDate: '2 days ago'
        },
        {
          id: 2,
          title: 'Business Professional',
          category: 'Formal',
          imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
          savedDate: '1 week ago'
        }
      ];
      this.saveBookmarks();
    }
  }

  saveBookmarks() {
    localStorage.setItem('stylehub_bookmarks', JSON.stringify(this.bookmarks));
  }

  removeBookmark(bookmark: any) {
    if (confirm('Remove this bookmark?')) {
      this.bookmarks = this.bookmarks.filter((b: any) => b.id !== bookmark.id);
      this.saveBookmarks();
    }
  }
}