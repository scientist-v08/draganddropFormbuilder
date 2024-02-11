import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output, inject } from "@angular/core";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { take, timer } from "rxjs";
import { FileuploadCreationPopup } from "../file-upload-creation-popup/file-upload-creation.component";
import { CheckboxCreationPopup } from "../checkbox-creation-popup/checkbox-creation-popup.component";
import { RadioButtonCreationPopup } from "../radio-button-creation-popup/radio-button-creation-popup.component";
import { SelectBoxCreationPopupComponent } from "../selectBox-creation-popup/selectBox-creation.component";
import { TextareaPopupComponent } from "../textarea-creation-popup/textarea-popup.component";
import { InputCreationPopupComponent } from "../input-field-creation-popup/input-field-creation-popup.component";
import { FormJsonCreator } from "../services/formjsoncreator.service";
import { FormcontrolInterface } from "../interfaces/formcontrol.interface";
import { LayoutFormcontrolInterface } from "../interfaces/layoutformcontrol.interface";
import { DropzoneManagementService } from "../services/dropzonemanagement.service";

@Component({
    standalone:true,
    imports:[CommonModule,MatDialogModule,MatIconModule],
    selector:"fb-layout-drop-zone",
    templateUrl:"./layout-drop-zone.component.html",
    styleUrls:["./layout-drop-zone.component.scss"]
})
export class LayoutDropzoneComponent implements OnInit{
    dialog = inject(MatDialog);
    formJsonFormat = inject(FormJsonCreator);
    dropzoneManager = inject(DropzoneManagementService);

    dropItem:string[]=[];
    droppedItem:LayoutFormcontrolInterface[]=[];
    @Input() layoutClass!:string;
    @Input() rowNumber!:number;
    @Input() columnNumber!:number;

    dragOver(event:DragEvent):void{
        event.preventDefault();
    }
    onDrop(event:DragEvent):void{
        event.preventDefault();
        this.dropzoneManager.setExternalDropzoneEnable(false);
        const data = event.dataTransfer?.getData("text/plain");
        const { label } = JSON.parse(data as string);
        this.dropItem.push(label);
        if(label == 'Input Field'){
            const dialogClosed = this.dialog.open(InputCreationPopupComponent,{
                width:'25%',
                data:{class:this.layoutClass,rowId:this.rowNumber,columnId:this.columnNumber}
            });
            dialogClosed.afterClosed()
                .pipe(take(1))
                .subscribe((result:number)=>{
                    if(result===1){
                        this.enableExternalDropZone();
                    }
                });
        }
        else if(label === 'Text Area'){
            const dialogClosed = this.dialog.open(TextareaPopupComponent,{
                width:'25%',
                data:{class:this.layoutClass,rowId:this.rowNumber,columnId:this.columnNumber}
            });
            dialogClosed.afterClosed()
                .pipe(take(1))
                .subscribe((result:number)=>{
                    if(result===1){
                        this.enableExternalDropZone();
                    }
                });
        }
        else if(label === 'Select Box'){
            const dialogClosed = this.dialog.open(SelectBoxCreationPopupComponent,{
                width:'25%',
                data:{class:this.layoutClass,rowId:this.rowNumber,columnId:this.columnNumber}
            });
            dialogClosed.afterClosed()
                .pipe(take(1))
                .subscribe((result:number)=>{
                    if(result===1){
                        this.enableExternalDropZone();
                    }
                });
        }
        else if(label === 'Radio Button'){
            const dialogClosed = this.dialog.open(RadioButtonCreationPopup,{
                width:'25%',
                data:{class:this.layoutClass,rowId:this.rowNumber,columnId:this.columnNumber}
            });
            dialogClosed.afterClosed()
                .pipe(take(1))
                .subscribe((result:number)=>{
                    if(result===1){
                        this.enableExternalDropZone();
                    }
                });
        }
        else if(label === 'Check Box'){
            const dialogClosed = this.dialog.open(CheckboxCreationPopup,{
                width:'25%',
                data:{class:this.layoutClass,rowId:this.rowNumber,columnId:this.columnNumber}
            });
            dialogClosed.afterClosed()
                .pipe(take(1))
                .subscribe((result:number)=>{
                    if(result===1){
                        this.enableExternalDropZone();
                    }
                });
        }
        else if(label === 'File Upload'){
            const dialogClosed = this.dialog.open(FileuploadCreationPopup,{
                width:'25%',
                data:{class:this.layoutClass,rowId:this.rowNumber,columnId:this.columnNumber}
            });
            dialogClosed.afterClosed()
                .pipe(take(1))
                .subscribe((result:number)=>{
                    if(result===1){
                        this.enableExternalDropZone();
                    }
                });
        }

    }
    enableExternalDropZone():void{
        this.dropzoneManager.setExternalDropzoneEnable(true);
    }

    ngOnInit():void{
        let itemToDisplay = this.formJsonFormat.getAllFields();
        let obtainedFieldItem = itemToDisplay.find(item => item.rowId === this.rowNumber) as FormcontrolInterface;
        let obatinedLayoutItem = obtainedFieldItem.layout?.find(item=>item.columnNumber===this.columnNumber) as LayoutFormcontrolInterface;
        if(obatinedLayoutItem.name !== ""){
            this.droppedItem.push(obatinedLayoutItem);
        }
    }
}
