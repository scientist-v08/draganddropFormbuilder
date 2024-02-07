import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableItemComponent } from './draggable-item/draggable-item.component';
import { DropZoneComponent } from './drop-zone/drop-zone.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Preview } from './preview/preview.component';
import { FormJsonCreator } from './services/formjsoncreator.service';
import { FormcontrolInterface } from './interfaces/formcontrol.interface';

@Component({
  selector: 'fb-root',
  standalone: true,
  imports: [CommonModule,DraggableItemComponent,DropZoneComponent,MatDialogModule],
  templateUrl: './app.component.html',
  styles:[`
  .scroll{
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .drop-zone {
    border: 2px dashed #ccc;
    padding: 2%;
    // margin-top: 20px;
  }
  `]
})
export class AppComponent implements OnInit {
    dialog = inject(MatDialog);
    jsonCreated = inject(FormJsonCreator);
    jsonFormat:FormcontrolInterface[]=[];
  	draggableItems: { label: string, type: string }[] = [
        { label: 'Input Field', type: 'text' },
        { label: 'Text Area', type: 'textarea' },
        { label: 'Select Box', type: 'select' },
        { label: 'Check Box', type: 'checkbox' },
        { label: 'Radio Button', type: 'radio' },
        { label: 'File Upload', type: 'fileupload' },
        { label: 'Layout', type: 'layout' },
  	];

    public ngOnInit():void{
        this.viewJson();
    }

    onClickPreview():void{
        this.dialog.open(Preview,{
            width: '65%'
        });
    }

    viewJson():void{
        this.jsonFormat=this.jsonCreated.getAllFields();
    }
}
