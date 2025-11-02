import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class PageHeaderComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() backgroundClass: string = 'gradient-primary';
  @Input() showBreadcrumb: boolean = false;
  @Input() breadcrumbItems: Array<{label: string, link?: string}> = [];
}
