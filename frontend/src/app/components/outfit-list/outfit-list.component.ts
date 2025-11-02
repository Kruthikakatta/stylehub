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
    // Load outfits from API
    this.outfitService.getOutfits().subscribe({
      next: (data: any) => {
        console.log('Outfits loaded from API:', data);
        if (data && data.length > 0) {
          // Map MongoDB _id to id for compatibility
          this.outfits = data.map((outfit: any) => ({
            ...outfit,
            id: outfit._id || outfit.id
          }));
        } else {
          // Fallback to mock data if no API data
          this.loadMockData();
        }
      },
      error: (error: any) => {
        console.error('Error loading outfits from API:', error);
        // Fallback to mock data on error
        this.loadMockData();
      }
    });
  }

  loadMockData() {
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
      }
    ];
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