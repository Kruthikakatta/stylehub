import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../layout/page-header/page-header.component';

interface Note {
  id: number;
  title: string;
  content: string;
  date: string;
  tags: string;
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent]
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  showAddForm = false;
  editingNote: Note | null = null;
  
  noteForm = {
    title: '',
    content: '',
    tags: ''
  };

  constructor() {}

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes() {
    // Load from localStorage
    const saved = localStorage.getItem('stylehub_notes');
    if (saved) {
      this.notes = JSON.parse(saved);
    } else {
      // Default notes
      this.notes = [
        {
          id: 1,
          title: 'Summer Outfit Ideas',
          content: 'Light cotton dresses, sandals, and statement jewelry work well for summer parties. Consider pastel colors and breathable fabrics.',
          date: this.formatDate(new Date()),
          tags: '#summer #party #pastel'
        },
        {
          id: 2,
          title: 'Business Meeting Attire',
          content: 'Navy blazer with white shirt and dark pants. Add a subtle tie for formal meetings. Consider a classic watch and leather shoes.',
          date: this.formatDate(new Date()),
          tags: '#formal #business #professional'
        }
      ];
      this.saveNotes();
    }
  }

  saveNotes() {
    localStorage.setItem('stylehub_notes', JSON.stringify(this.notes));
  }

  openAddForm() {
    this.showAddForm = true;
    this.editingNote = null;
    this.resetForm();
  }

  editNote(note: Note) {
    this.editingNote = note;
    this.showAddForm = true;
    this.noteForm = {
      title: note.title,
      content: note.content,
      tags: note.tags
    };
  }

  saveNote() {
    if (!this.noteForm.title.trim()) {
      alert('Please enter a title');
      return;
    }

    if (this.editingNote) {
      // Update existing note
      const index = this.notes.findIndex((n: Note) => n.id === this.editingNote!.id);
      this.notes[index] = {
        ...this.notes[index],
        ...this.noteForm,
        date: this.formatDate(new Date())
      };
    } else {
      // Add new note
      const newNote: Note = {
        id: Date.now(),
        title: this.noteForm.title,
        content: this.noteForm.content,
        tags: this.noteForm.tags,
        date: this.formatDate(new Date())
      };
      this.notes.unshift(newNote);
    }

    this.saveNotes();
    this.cancelForm();
  }

  deleteNote(note: Note) {
    if (confirm('Are you sure you want to delete this note?')) {
      this.notes = this.notes.filter((n: Note) => n.id !== note.id);
      this.saveNotes();
    }
  }

  cancelForm() {
    this.showAddForm = false;
    this.editingNote = null;
    this.resetForm();
  }

  resetForm() {
    this.noteForm = {
      title: '',
      content: '',
      tags: ''
    };
  }

  formatDate(date: Date): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }

  getTagArray(tags: string): string[] {
    return tags.split(' ').filter((t: string) => t.trim().length > 0);
  }
}