import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OutfitService } from '../../services/outfit.service';
import { PageHeaderComponent } from '../layout/page-header/page-header.component';

@Component({
  selector: 'app-outfit-list',
  templateUrl: './outfit-list.component.html',
  styleUrls: ['./outfit-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, PageHeaderComponent]
})
export class OutfitListComponent implements OnInit {
  outfits: any[] = [];

  constructor(private outfitService: OutfitService) {}

  ngOnInit(): void {
    // Mock data for demonstration
    this.outfits = [
      {
        id: 1,
        title: 'Summer Breeze',
        description: 'Light and comfortable outfit perfect for warm weather',
        imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop',
        category: 'Casual',
        isTrending: true,
        rating: 4.9,
        views: 1250,
        likes: 89
      },
      {
        id: 2,
        title: 'Business Elegance',
        description: 'Professional attire for important meetings',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
        category: 'Formal',
        isTrending: false,
        rating: 4.7,
        views: 980,
        likes: 67
      },
      {
        id: 3,
        title: 'Night Glamour',
        description: 'Stunning outfit for special evening events',
        imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop',
        category: 'Party',
        isTrending: true,
        rating: 4.8,
        views: 2100,
        likes: 156
      },
      {
        id: 4,
        title: 'Urban Street',
        description: 'Cool street style for the modern city dweller',
        imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=500&fit=crop',
        category: 'Street',
        isTrending: false,
        rating: 4.6,
        views: 750,
        likes: 43
      },
      {
        id: 5,
        title: 'Weekend Casual',
        description: 'Relaxed outfit for weekend adventures',
        imageUrl: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&h=500&fit=crop',
        category: 'Casual',
        isTrending: true,
        rating: 4.5,
        views: 890,
        likes: 72
      },
      {
        id: 6,
        title: 'Garden Party',
        description: 'Elegant floral outfit for outdoor celebrations',
        imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop',
        category: 'Party',
        isTrending: false,
        rating: 4.9,
        views: 1650,
        likes: 134
      }
    ];
    
    // Try to load from service, fallback to mock data
    this.outfitService.getOutfits().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.outfits = data;
        }
      },
      error: (error) => {
        console.log('Using mock data:', error);
      }
    });
  }

  trackByOutfitId(index: number, outfit: any): number {
    return outfit.id;
  }

  getRandomViews(): number {
    return Math.floor(Math.random() * 1000) + 100;
  }

  getRandomLikes(): number {
    return Math.floor(Math.random() * 500) + 50;
  }
}