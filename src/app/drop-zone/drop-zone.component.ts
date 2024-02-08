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
import { LayoutCreationPopupComponent } from "../layout-creation-popup/layout-creation-popup.component";
import { LayoutCreationInterface } from "../interfaces/layoutcreation.interface";
import { LayoutTrackerInterface } from "../interfaces/layouttracker.interface";
import { LayoutDropzoneComponent } from "../layout-drop-zone/layout-drop-zone.component";

@Component({
    standalone:true,
    imports:[CommonModule,MatDialogModule,MatIconModule,LayoutDropzoneComponent],
    selector:'fb-drop-zone',
    templateUrl:"./drop-zone.component.html",
    styleUrls:["./drop-zone.component.scss"]
})
export class DropZoneComponent{
    dialog = inject(MatDialog);
    formJsonFormat = inject(FormJsonCreator);

    dropItem:string[]=[];
    droppedItem:FormcontrolInterface[]=[];
    class:string="col-md-12";
    rowNumber:number=-1;
	layoutTracker:LayoutTrackerInterface[]=[];
    enableDropZone:boolean = true;

    dragOver(event:DragEvent):void{
        event.preventDefault();
    }
    onDrop(event:DragEvent):void{
        event.preventDefault();
        if(this.enableDropZone===true){
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
                    .subscribe((result:number)=>{
                        if(result===1){
                            this.rowNumber++;
                            this.droppedItem=this.formJsonFormat.getAllFields();
                        }
                    });
            }
            else if(label === 'Text Area'){
                const dialogClosed = this.dialog.open(TextareaPopupComponent,{
                    width:'25%',
                    data:{class:this.class}
                });
                dialogClosed.afterClosed()
                    .pipe(take(1))
                    .subscribe((result:number)=>{
                        if(result===1){
                            this.rowNumber++;
                            this.droppedItem=this.formJsonFormat.getAllFields();
                        }
                    });
            }
            else if(label === 'Select Box'){
                const dialogClosed = this.dialog.open(SelectBoxCreationPopupComponent,{
                    width:'25%',
                    data:{class:this.class}
                });
                dialogClosed.afterClosed()
                    .pipe(take(1))
                    .subscribe((result:number)=>{
                        if(result===1){
                            this.rowNumber++;
                            this.droppedItem=this.formJsonFormat.getAllFields();
                        }
                    });
            }
            else if(label === 'Radio Button'){
                const dialogClosed = this.dialog.open(RadioButtonCreationPopup,{
                    width:'25%',
                    data:{class:this.class}
                });
                dialogClosed.afterClosed()
                    .pipe(take(1))
                    .subscribe((result:number)=>{
                        if(result===1){
                            this.rowNumber++;
                            this.droppedItem=this.formJsonFormat.getAllFields();
                        }
                    });
            }
            else if(label === 'Check Box'){
                const dialogClosed = this.dialog.open(CheckboxCreationPopup,{
                    width:'25%',
                    data:{class:this.class}
                });
                dialogClosed.afterClosed()
                    .pipe(take(1))
                    .subscribe((result:number)=>{
                        if(result===1){
                            this.rowNumber++;
                            this.droppedItem=this.formJsonFormat.getAllFields();
                        }
                    });
            }
            else if(label === 'File Upload'){
                const dialogClosed = this.dialog.open(FileuploadCreationPopup,{
                    width:'25%',
                    data:{class:this.class}
                });
                dialogClosed.afterClosed()
                    .pipe(take(1))
                    .subscribe((result:number)=>{
                        if(result===1){
                            this.rowNumber++;
                            this.droppedItem=this.formJsonFormat.getAllFields();
                        }
                    });
            }
            else if(label === 'Layout'){
                const dialogClosed = this.dialog.open(LayoutCreationPopupComponent,{
                    width:'25%'
                });
                dialogClosed.afterClosed()
                    .pipe(take(1))
                    .subscribe((result:LayoutCreationInterface)=>{
                        this.rowNumber++;
                        let class_ = "col-"+result.size+"-"+result.columnSize;
                        this.layoutCreationFunc(this.rowNumber,class_,result.numberOfFields);
                        for(let i=0;i<result.numberOfFields;i++){
                            let droppedLayoutItem : FormcontrolInterface = {
                                name:"",
                                label:"",
                                placeholder:"",
                                class:"",
                                type:"layout",
                                rowId: this.rowNumber,
                                layout: {
                                    name:"",
                                    label:"",
                                    placeholder:"",
                                    columnNumber: i,
                                    type:""
                                }
                            }
                            this.formJsonFormat.fieldCreator(droppedLayoutItem);
                        }
                        this.droppedItem=this.formJsonFormat.getAllFields();
                    });
            }
        }
    }

	layoutCreationFunc(id_:number,class_:string,feilds:number):void{
        const index = this.layoutTracker.findIndex(item => item.id === id_);
        let classArray:string[]=[];
        for (let i = 0; i < feilds; i++) {
            classArray[i] = class_;
        }
        const newLayout : LayoutTrackerInterface = {
            id:id_,
            layoutClass: classArray
        }
        if(index === -1){
            this.layoutTracker.push(newLayout);
        }
        else{
            this.layoutTracker[index]=newLayout;
        }
    }

    layoutToBeUsed(row:number):string[]{
        let requiredLayout : LayoutTrackerInterface = this.layoutTracker.find(item => item.id === row) as LayoutTrackerInterface;
        if(requiredLayout!==undefined){
            return requiredLayout.layoutClass;
        }
        else return [];
    }

    dropZoneDisable(event:boolean):void{
        this.enableDropZone=event;
    }
}
