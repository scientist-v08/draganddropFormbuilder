import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { InputCreationPopupComponent } from "../input-field-creation-popup/input-field-creation-popup.component";
import { take } from "rxjs";
import { FormcontrolInterface } from "../interfaces/formcontrol.interface";
import { FormJsonCreator } from "../services/formjsoncreator.service";
import { TextareaPopupComponent } from "../textarea-creation-popup/textarea-popup.component";

@Component({
    standalone:true,
    imports:[CommonModule,MatDialogModule],
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
                })
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
                })
        }
    }
}
