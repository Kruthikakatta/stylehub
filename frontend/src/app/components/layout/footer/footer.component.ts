import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  quickLinks = [
    { label: 'Outfits', link: '/outfits' },
    { label: 'Categories', link: '/categories' },
    { label: 'Search', link: '/search' },
    { label: 'Bookmarks', link: '/bookmarks' }
  ];

  accountLinks = [
    { label: 'Login', link: '/login' },
    { label: 'Sign Up', link: '/signup' },
    { label: 'Profile', link: '/profile' },
    { label: 'Settings', link: '/settings' }
  ];

  supportLinks = [
    { label: 'Help Center', link: '/help' },
    { label: 'Contact Us', link: '/contact' },
    { label: 'Privacy Policy', link: '/privacy' },
    { label: 'Terms of Service', link: '/terms' }
  ];

  socialLinks = [
    { label: 'Instagram', icon: '📷', url: 'https://instagram.com/stylehub' },
    { label: 'Facebook', icon: '📘', url: 'https://facebook.com/stylehub' },
    { label: 'Twitter', icon: '🐦', url: 'https://twitter.com/stylehub' },
    { label: 'Pinterest', icon: '📌', url: 'https://pinterest.com/stylehub' }
  ];
}
