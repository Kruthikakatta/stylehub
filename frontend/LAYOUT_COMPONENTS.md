# StyleHub Layout Components

This document explains how to use the new layout components in StyleHub.

## Components Overview

### 1. Navbar Component (`app-navbar`)
The main navigation component with responsive mobile menu.

**Location:** `src/app/components/layout/navbar/`

**Features:**
- Responsive design with mobile hamburger menu
- Active route highlighting
- Smooth animations and transitions
- Brand logo with hover effects

### 2. Page Header Component (`app-page-header`)
Reusable page header with customizable backgrounds and content.

**Location:** `src/app/components/layout/page-header/`

**Features:**
- Multiple background options (gradients, solid colors)
- Optional breadcrumb navigation
- Decorative animated elements
- Responsive design

**Usage:**
```html
<app-page-header 
  title="Page Title" 
  subtitle="Page subtitle or description"
  backgroundClass="gradient-primary"
  [showBreadcrumb]="true"
  [breadcrumbItems]="breadcrumbArray">
  
  <!-- Optional action buttons -->
  <div slot="actions">
    <button class="btn btn-primary">Action Button</button>
  </div>
</app-page-header>
```

**Background Classes:**
- `gradient-primary` - Purple to pink gradient
- `gradient-hero` - Multi-color hero gradient
- `gradient-secondary` - Rose to purple gradient
- `background-white` - Clean white background
- `background-gray` - Light gray background

### 3. Footer Component (`app-footer`)
Comprehensive footer with links, social media, and newsletter signup.

**Location:** `src/app/components/layout/footer/`

**Features:**
- Organized link sections
- Social media links
- Newsletter subscription
- Responsive grid layout
- Dynamic copyright year

## Updated App Structure

The main app now uses a clean layout structure:

```html
<div class="app-container">
  <app-navbar></app-navbar>
  
  <main class="main-content">
    <router-outlet></router-outlet>
  </main>
  
  <app-footer></app-footer>
</div>
```

## Updated Components

The following components have been updated to use the new page header:

- **Outfit List Component** - Uses `gradient-primary` background
- **Category Component** - Uses `gradient-hero` background  
- **Search Component** - Uses `gradient-secondary` background

## Benefits

1. **Consistency** - All pages now have consistent navigation and footer
2. **Maintainability** - Layout changes only need to be made in one place
3. **Reusability** - Page headers can be easily reused across different pages
4. **Responsiveness** - All components are fully responsive
5. **Performance** - Modular structure allows for better code splitting

## Adding New Pages

To add a new page with the layout components:

1. Create your component in the appropriate folder
2. Import the `PageHeaderComponent` in your component
3. Add it to your imports array
4. Use the page header in your template:

```typescript
import { PageHeaderComponent } from '../layout/page-header/page-header.component';

@Component({
  // ...
  imports: [CommonModule, PageHeaderComponent]
})
```

```html
<app-page-header 
  title="Your Page Title" 
  subtitle="Your page description"
  backgroundClass="gradient-primary">
</app-page-header>
```

This modular approach makes it easy to maintain consistency across your application while providing flexibility for different page designs.
