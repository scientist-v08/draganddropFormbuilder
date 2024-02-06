import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { InputCreationPopupComponent } from "../input-field-creation-popup/input-field-creation-popup.component";
import { take } from "rxjs";
import { FormcontrolInterface } from "../interfaces/formcontrol.interface";
import { FormJsonCreator } from "../services/formjsoncreator.service";
import { TextareaPopupComponent } from "../textarea-creation-popup/textarea-popup.component";
import { SelectBoxCreationPopupComponent } from "../selectBox-creation-popup/selectBox-creation.component";
import { RadioButtonCreationPopup } from "../radio-button-creation-popup/radio-button-creation-popup.component";
import { CheckboxCreationPopup } from "../checkbox-creation-popup/checkbox-creation-popup.component";
import { FileuploadCreationPopup } from "../file-upload-creation-popup/file-upload-creation.component";

@Component({
    standalone:true,
    imports:[CommonModule,MatDialogModule,MatIconModule],
    selector:'fb-drop-zone',
    templateUrl:"./drop-zone.component.html",
    styleUrls:["./drop-zone.component.scss"]
})
export class DropZoneComponent{
    dialog = inject(MatDialog);
    getJson = inject(FormJsonCreator);

    dropItem:string[]=[];
    droppedItem:FormcontrolInterface[]=[];
    class:string="col-md-12";

    dragOver(event:DragEvent):void{
        event.preventDefault();
    }
    onDrop(event:DragEvent):void{
        event.preventDefault();
        const data = event.dataTransfer?.getData("text/plain");
        const { label } = JSON.parse(data as string);
        this.dropItem.push(label);
        if(label == 'Input Field'){
            const dialogClosed = this.dialog.open(InputCreationPopupComponent,{
                width:'25%',
                data:{class:this.class}
            });
            dialogClosed.afterClosed()
                .pipe(take(1))
                .subscribe(result=>{
                    if(result===1) this.droppedItem=this.getJson.getAllFields();
                });
        }
        else if(label === 'Text Area'){
            const dialogClosed = this.dialog.open(TextareaPopupComponent,{
                width:'25%',
                data:{class:this.class}
            });
            dialogClosed.afterClosed()
                .pipe(take(1))
                .subscribe(result=>{
                    if(result===1) this.droppedItem=this.getJson.getAllFields();
                });
        }
        else if(label === 'Select Box'){
            const dialogClosed = this.dialog.open(SelectBoxCreationPopupComponent,{
                width:'25%',
                data:{class:this.class}
            });
            dialogClosed.afterClosed()
                .pipe(take(1))
                .subscribe(result=>{
                    if(result===1) this.droppedItem=this.getJson.getAllFields();
                });
        }
        else if(label === 'Radio Button'){
            const dialogClosed = this.dialog.open(RadioButtonCreationPopup,{
                width:'25%',
                data:{class:this.class}
            });
            dialogClosed.afterClosed()
                .pipe(take(1))
                .subscribe(result=>{
                    if(result===1) this.droppedItem=this.getJson.getAllFields();
                });
        }
        else if(label === 'Check Box'){
            const dialogClosed = this.dialog.open(CheckboxCreationPopup,{
                width:'25%',
                data:{class:this.class}
            });
            dialogClosed.afterClosed()
                .pipe(take(1))
                .subscribe(result=>{
                    if(result===1) this.droppedItem=this.getJson.getAllFields();
                });
        }
        else if(label === 'File Upload'){
            const dialogClosed = this.dialog.open(FileuploadCreationPopup,{
                width:'25%',
                data:{class:this.class}
            });
            dialogClosed.afterClosed()
                .pipe(take(1))
                .subscribe(result=>{
                    if(result===1) this.droppedItem=this.getJson.getAllFields();
                });
        }
    }
}
