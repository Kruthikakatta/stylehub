import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from '../layout/page-header/page-header.component';
import { OutfitService } from '../../services/outfit.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, PageHeaderComponent]
})
export class SearchComponent implements OnInit {
  searchQuery = '';
  searchResults: any[] = [];
  allOutfits: any[] = [];
  filteredResults: any[] = [];
  isLoading = false;

  constructor(private outfitService: OutfitService) {}

  ngOnInit(): void {
    this.loadAllOutfits();
  }

  loadAllOutfits() {
    this.outfitService.getOutfits().subscribe({
      next: (data: any) => {
        this.allOutfits = data.map((outfit: any) => ({
          ...outfit,
          id: outfit._id || outfit.id
        }));
        this.filteredResults = this.allOutfits;
      },
      error: (error: any) => {
        console.error('Error loading outfits:', error);
      }
    });
  }

  onSearch() {
    if (!this.searchQuery.trim()) {
      this.filteredResults = this.allOutfits;
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredResults = this.allOutfits.filter((outfit: any) => {
      return outfit.title?.toLowerCase().includes(query) ||
             outfit.description?.toLowerCase().includes(query) ||
             outfit.category?.toLowerCase().includes(query);
    });
  }

  clearSearch() {
    this.searchQuery = '';
    this.filteredResults = this.allOutfits;
  }
}
