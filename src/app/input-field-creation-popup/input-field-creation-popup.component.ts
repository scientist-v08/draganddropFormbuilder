import { CommonModule } from "@angular/common";
import { Component, Inject, inject } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormJsonCreator } from "../services/formjsoncreator.service";
import { FormcontrolInterface } from "../interfaces/formcontrol.interface";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";

@Component({
    standalone:true,
    imports:[CommonModule,ReactiveFormsModule,MatDialogModule,FormsModule],
    selector:"fb-input-feild-popup",
    templateUrl:"./input-field-creation-popup.component.html"
})
export class InputCreationPopupComponent{
    private jsonStorage = inject(FormJsonCreator);
    public dialogRef = inject(MatDialogRef<InputCreationPopupComponent>);
    constructor(@Inject(MAT_DIALOG_DATA) public data: {class:string}) {}

    public name:string="";
    public label:string="";
    public value:string="";
    public placeholder:string="";
    public class:string=this.data.class as string;
    public type:string="text";
    onSubmit():void{
        let field : FormcontrolInterface = {
            'class':this.class,
            'label':this.label,
            'name':this.name,
            'placeholder':this.placeholder,
            'type':this.type
        }
        this.jsonStorage.fieldCreator(field);
        this.dialogRef.close(1);
    }
}