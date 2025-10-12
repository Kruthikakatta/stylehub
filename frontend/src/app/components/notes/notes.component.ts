import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class NotesComponent implements OnInit {
  notes = [
    {
      title: 'Summer Outfit Ideas',
      content: 'Light cotton dresses, sandals, and statement jewelry work well for summer parties.',
      date: 'Dec 10, 2024',
      tags: '#summer #party'
    },
    {
      title: 'Business Meeting Attire',
      content: 'Navy blazer with white shirt and dark pants. Add a subtle tie for formal meetings.',
      date: 'Dec 8, 2024',
      tags: '#formal #business'
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}