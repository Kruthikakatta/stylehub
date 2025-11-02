import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OutfitService } from '../../services/outfit.service';

@Component({
  selector: 'app-outfit-detail',
  templateUrl: './outfit-detail.component.html',
  styleUrls: ['./outfit-detail.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class OutfitDetailComponent implements OnInit {
  outfit: any;
  selectedImageIndex = 0;
  
  // Mock related outfits data
  relatedOutfits = [
    {
      title: 'Summer Casual',
      category: 'Casual',
      imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=250&fit=crop'
    },
    {
      title: 'Business Professional',
      category: 'Formal',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=250&fit=crop'
    },
    {
      title: 'Street Style',
      category: 'Street',
      imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&h=250&fit=crop'
    }
  ];

  constructor(private route: ActivatedRoute, private outfitService: OutfitService) {}

  ngOnInit(): void {
    // Use paramMap to handle navigation changes
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')!;
      console.log('Loading outfit with ID:', id);
      this.loadOutfit(id);
    });
  }

  loadOutfit(id: string) {
    // Load outfit from API
    this.outfitService.getOutfitById(id).subscribe({
      next: (data: any) => {
        console.log('Outfit loaded from API:', data);
        if (data) {
          // Combine API data with mock additional fields
          this.outfit = {
            ...data,
            id: data._id || data.id,
            rating: 4.5 + Math.random() * 0.4, // Random rating between 4.5-4.9
            reviews: Math.floor(Math.random() * 200) + 50,
            views: Math.floor(Math.random() * 2000) + 500,
            likes: Math.floor(Math.random() * 200) + 30,
            saves: Math.floor(Math.random() * 100) + 10,
            styleTips: [
              'Perfect for special occasions',
              'Pair with matching accessories',
              'Great for evening events',
              'Comfortable and stylish'
            ],
            colors: this.generateColors(data.category),
            images: [
              data.imageUrl,
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop',
              'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=800&fit=crop'
            ]
          };
        } else {
          // Fallback to mock if API fails
          this.loadMockData(id);
        }
      },
      error: (error: any) => {
        console.error('Error loading outfit from API:', error);
        this.loadMockData(id);
      }
    });
  }

  loadMockData(id: string) {
    this.outfit = {
      id: id,
      title: 'Elegant Evening Look',
      description: 'A stunning outfit perfect for special evening events.',
      imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop',
      category: 'Party',
      rating: 4.8,
      reviews: 124,
      views: 1250,
      likes: 89,
      saves: 34,
      styleTips: ['Pair with nude heels', 'Add statement jewelry'],
      colors: [{ name: 'Navy Blue', color: '#1e3a8a' }],
      images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop']
    };
  }

  generateColors(category: string): any[] {
    const colorMap: any = {
      'Casual': [
        { name: 'Blue', color: '#3b82f6' },
        { name: 'White', color: '#ffffff' },
        { name: 'Gray', color: '#6b7280' }
      ],
      'Formal': [
        { name: 'Navy', color: '#1e3a8a' },
        { name: 'Black', color: '#000000' },
        { name: 'Gray', color: '#4b5563' }
      ],
      'Party': [
        { name: 'Black', color: '#000000' },
        { name: 'Gold', color: '#f59e0b' },
        { name: 'Red', color: '#dc2626' }
      ],
      'Street': [
        { name: 'Black', color: '#000000' },
        { name: 'Gray', color: '#374151' },
        { name: 'White', color: '#ffffff' }
      ]
    };
    return colorMap[category] || [
      { name: 'Blue', color: '#3b82f6' },
      { name: 'White', color: '#ffffff' }
    ];
  }

  selectImage(index: number): void {
    this.selectedImageIndex = index;
    if (this.outfit.images && this.outfit.images[index]) {
      this.outfit.imageUrl = this.outfit.images[index];
    }
  }
}