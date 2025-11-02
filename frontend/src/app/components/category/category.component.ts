import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from '../layout/page-header/page-header.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, PageHeaderComponent]
})
export class CategoryComponent implements OnInit {
  categories = [
    {
      name: 'Casual',
      description: 'Comfortable everyday styles',
      imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop',
      outfitCount: 45
    },
    {
      name: 'Formal',
      description: 'Professional and elegant looks',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      outfitCount: 32
    },
    {
      name: 'Party',
      description: 'Fun and festive outfits',
      imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop',
      outfitCount: 28
    },
    {
      name: 'Street',
      description: 'Urban and trendy fashion',
      imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
      outfitCount: 38
    },
    {
      name: 'Summer',
      description: 'Light and breezy styles',
      imageUrl: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&h=300&fit=crop',
      outfitCount: 52
    },
    {
      name: 'Winter',
      description: 'Warm and cozy outfits',
      imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop',
      outfitCount: 41
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}