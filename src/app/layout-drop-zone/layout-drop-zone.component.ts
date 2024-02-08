import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
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

@Component({
    standalone:true,
    imports:[CommonModule,MatDialogModule,MatIconModule],
    selector:"fb-layout-drop-zone",
    templateUrl:"./layout-drop-zone.component.html",
    styleUrls:["./layout-drop-zone.component.scss"]
})
export class LayoutDropzoneComponent{
    dialog = inject(MatDialog);
    formJsonFormat = inject(FormJsonCreator);

    dropItem:string[]=[];
    droppedItem:FormcontrolInterface[]=[];
    @Input() layoutClass!:string;
    @Input() rowNumber!:number;
    @Input() columnNumber!:number;
    @Output() externalDropZoneDisable = new EventEmitter<boolean>();

    dragOver(event:DragEvent):void{
        event.preventDefault();
    }
    onDrop(event:DragEvent):void{
        event.preventDefault();
        this.externalDropZoneDisable.emit(false);
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
                        let itemToDisplay = this.formJsonFormat.getAllFields();
                        let obtainedItem = itemToDisplay.find(item => item.rowId === this.rowNumber && item.layout?.columnNumber===this.columnNumber) as FormcontrolInterface;
                        this.droppedItem.push(obtainedItem);
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
                        let itemToDisplay = this.formJsonFormat.getAllFields();
                        let obtainedItem = itemToDisplay.find(item => item.rowId === this.rowNumber && item.layout?.columnNumber===this.columnNumber) as FormcontrolInterface;
                        this.droppedItem.push(obtainedItem);
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
                        let itemToDisplay = this.formJsonFormat.getAllFields();
                        let obtainedItem = itemToDisplay.find(item => item.rowId === this.rowNumber && item.layout?.columnNumber===this.columnNumber) as FormcontrolInterface;
                        this.droppedItem.push(obtainedItem);
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
                        let itemToDisplay = this.formJsonFormat.getAllFields();
                        let obtainedItem = itemToDisplay.find(item => item.rowId === this.rowNumber && item.layout?.columnNumber===this.columnNumber) as FormcontrolInterface;
                        this.droppedItem.push(obtainedItem);
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
                        let itemToDisplay = this.formJsonFormat.getAllFields();
                        let obtainedItem = itemToDisplay.find(item => item.rowId === this.rowNumber && item.layout?.columnNumber===this.columnNumber) as FormcontrolInterface;
                        this.droppedItem.push(obtainedItem);
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
                        let itemToDisplay = this.formJsonFormat.getAllFields();
                        let obtainedItem = itemToDisplay.find(item => item.rowId === this.rowNumber && item.layout?.columnNumber===this.columnNumber) as FormcontrolInterface;
                        this.droppedItem.push(obtainedItem);
                    }
                });
        }

    }
    enableExternalDropZone():void{
        timer(1000)
            .pipe(take(1))
            .subscribe(()=>{
                this.externalDropZoneDisable.emit(true);
            });
    }
}
