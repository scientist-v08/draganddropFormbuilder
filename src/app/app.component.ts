import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableItemComponent } from './draggable-item/draggable-item.component';
import { DropZoneComponent } from './drop-zone/drop-zone.component';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Preview } from './preview/preview.component';

@Component({
  selector: 'fb-root',
  standalone: true,
  imports: [CommonModule,DraggableItemComponent,DropZoneComponent,FormsModule,MatDialogModule],
  templateUrl: './app.component.html',
  styles:[`
  .scroll{
    overflow-x: hidden;
    overflow-y: scroll;
  }
  `]
})
export class AppComponent {
    dialog = inject(MatDialog);
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

    onClickPreview():void{
        this.dialog.open(Preview,{
            width: '65%'
        });
    }
}
