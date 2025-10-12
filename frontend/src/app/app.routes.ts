import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OutfitListComponent } from './components/outfit-list/outfit-list.component';
import { OutfitDetailComponent } from './components/outfit-detail/outfit-detail.component';
import { CategoryComponent } from './components/category/category.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { NotesComponent } from './components/notes/notes.component';
import { SearchComponent } from './components/search/search.component';
import { LoginComponent } from './components/auth/login.component';
import { SignupComponent } from './components/auth/signup.component';

export const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'outfits',component:OutfitListComponent},
  {path:'outfit/:id',component:OutfitDetailComponent},
  {path:'categories',component:CategoryComponent},
  {path:'bookmarks',component:BookmarksComponent},
  {path:'notes',component:NotesComponent},
  {path:'search',component:SearchComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent}
];
