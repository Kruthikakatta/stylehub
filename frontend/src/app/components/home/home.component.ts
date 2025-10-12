import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class HomeComponent {
  categories = [
    {
      name: 'Casual',
      emoji: '👕',
      description: 'Everyday comfortable styles'
    },
    {
      name: 'Formal',
      emoji: '👔',
      description: 'Professional and elegant looks'
    },
    {
      name: 'Party',
      emoji: '🎉',
      description: 'Fun and festive outfits'
    },
    {
      name: 'Street',
      emoji: '👟',
      description: 'Urban and trendy fashion'
    }
  ];

  trendingOutfits = [
    {
      title: 'Summer Casual',
      description: 'Perfect for a day out',
      imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop',
      category: 'Casual',
      likes: 234
    },
    {
      title: 'Business Professional',
      description: 'Elegant office attire',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
      category: 'Formal',
      likes: 189
    },
    {
      title: 'Night Out',
      description: 'Stylish evening look',
      imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop',
      category: 'Party',
      likes: 312
    },
    {
      title: 'Street Style',
      description: 'Urban cool vibes',
      imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=500&fit=crop',
      category: 'Street',
      likes: 156
    }
  ];
}