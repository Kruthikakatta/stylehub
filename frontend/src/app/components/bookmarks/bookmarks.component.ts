import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class BookmarksComponent implements OnInit {
  bookmarks = [
    {
      title: 'Summer Breeze',
      category: 'Casual',
      imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
      savedDate: '2 days ago'
    },
    {
      title: 'Business Professional',
      category: 'Formal',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
      savedDate: '1 week ago'
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}