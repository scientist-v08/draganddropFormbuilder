import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableItemComponent } from './draggable-item/draggable-item.component';
import { DropZoneComponent } from './drop-zone/drop-zone.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'fb-root',
  standalone: true,
  imports: [CommonModule,DraggableItemComponent,DropZoneComponent,FormsModule],
  templateUrl: './app.component.html',
  styles:[`
  .scroll{
    overflow-x: hidden;
    overflow-y: scroll;
  }
  `]
})
export class AppComponent {
  numEntries: number=1;
  entries: { name: string, email: string }[] = [{ name: '', email: '' }];
  draggableItems: { label: string, type: string }[] = [
    { label: 'Input Field', type: 'text' },
    { label: 'Text Area', type: 'textarea' },
    { label: 'Select Box', type: 'select' },
    { label: 'Check Box', type: 'checkbox' },
    { label: 'Radio Button', type: 'radio' },
    { label: 'File Upload', type: 'fileupload' },
    { label: 'Layout', type: 'layout' },
  ];

  onSubmit() {
    console.log("Form submitted!");
    console.log("Entries: ", this.entries);
  }

  addEntries() {
    this.entries = [];
    for (let i = 0; i < this.numEntries; i++) {
      this.entries.push({ name: '', email: '' });
    }
  }
}
