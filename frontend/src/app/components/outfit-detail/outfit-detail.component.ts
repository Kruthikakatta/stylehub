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
    const id = this.route.snapshot.paramMap.get('id')!;
    
    // Mock outfit data for demonstration
    this.outfit = {
      id: id,
      title: 'Elegant Evening Look',
      description: 'A stunning outfit perfect for special evening events. This carefully curated ensemble combines sophistication with modern style, featuring elegant fabrics and contemporary design elements.',
      imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop',
      category: 'Party',
      rating: 4.8,
      reviews: 124,
      views: 1250,
      likes: 89,
      saves: 34,
      styleTips: [
        'Pair with nude heels for a classic look',
        'Add a statement necklace for extra glamour',
        'Perfect for dinner dates and special occasions',
        'Layer with a blazer for cooler evenings'
      ],
      colors: [
        { name: 'Navy Blue', color: '#1e3a8a' },
        { name: 'Gold', color: '#f59e0b' },
        { name: 'White', color: '#ffffff' },
        { name: 'Black', color: '#000000' }
      ],
      images: [
        'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop',
        'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=800&fit=crop'
      ]
    };
    
    // Try to load from service, fallback to mock data
    this.outfitService.getOutfitById(id).subscribe({
      next: (data) => {
        if (data) {
          this.outfit = data;
        }
      },
      error: (error) => {
        console.log('Using mock data:', error);
      }
    });
  }

  selectImage(index: number): void {
    this.selectedImageIndex = index;
    if (this.outfit.images && this.outfit.images[index]) {
      this.outfit.imageUrl = this.outfit.images[index];
    }
  }
}