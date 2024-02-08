import { CommonModule } from "@angular/common";
import { Component, Inject, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { FormJsonCreator } from "../services/formjsoncreator.service";
import { FormcontrolNameGenerator } from "../services/formcontrolnamegenerator.service";
import { ValidatorInterface } from "../interfaces/validator.interface";
import { FormcontrolInterface } from "../interfaces/formcontrol.interface";
import { LayoutFormcontrolInterface } from "../interfaces/layoutformcontrol.interface";

@Component({
	standalone:true,
	imports:[CommonModule,MatDialogModule,FormsModule],
	selector:"fb-radio-button-creation-popup",
	templateUrl:"./radio-button-creation-popup.component.html"
})
export class RadioButtonCreationPopup{
    private jsonStorage = inject(FormJsonCreator);
    private nameGenerator = inject(FormcontrolNameGenerator);
    public dialogRef = inject(MatDialogRef<RadioButtonCreationPopup>);
    constructor(@Inject(MAT_DIALOG_DATA) public data: {class:string,rowId?:number,columnId?:number}) {}

    label:string="";
    value:string="";
    class:string=this.data.class as string;
    requiredField:boolean=false;
    numberOfOptions:number | undefined;
    optionsEntry:string[]=[];
    optionSelect:boolean=false;
    enableSubmit:boolean=false;

    addEntries():void{
        if(this.numberOfOptions !== undefined){
            this.optionsEntry=[];
            for(let i=0;i<this.numberOfOptions;i++){
                this.optionsEntry.push("");
            }
            this.optionSelect=true;
        }
        this.enableSubmitButton();
    }

    enableSubmitButton():void{
        if(this.label!=="" && this.numberOfOptions as number > 0){
            this.enableSubmit=true;
        }
    }

    onSubmit():void{
        if(this.data.rowId === undefined){
            this.withoutLayoutFormCreation();
        }
        else if(this.data.rowId !== undefined){
            this.withLayoutFormCreation();
        }
    }

    withoutLayoutFormCreation():void{
        let field: FormcontrolInterface;
        if(this.requiredField===false){
            field = {
                'class':this.class,
                'label':this.label,
                'name':this.nameGenerator.transformString(this.label),
                'value':this.value,
                'radioOptions':this.optionsEntry,
                'placeholder':"",
                'type':'radio'
            }
            this.jsonStorage.fieldCreator(field);
        }
        else if(this.requiredField===true){
            let validations:ValidatorInterface[]=[{
                validationName:"required",
                message:"This is a required field"
            }];
            field = {
                'class':this.class,
                'label':this.label,
                'name':this.nameGenerator.transformString(this.label),
                'value':this.value,
                'validators': validations,
                'radioOptions':this.optionsEntry,
                'placeholder':"",
                'type':'radio'
            }
            this.jsonStorage.fieldCreator(field);
        }
        this.dialogRef.close(1);
    }

    withLayoutFormCreation():void{
        let field: LayoutFormcontrolInterface;
        const fieldIndex : number = this.jsonStorage.getAllFields().findIndex(item => item.rowId === this.data.rowId);
        const fieldData : FormcontrolInterface = this.jsonStorage.getAllFields().find(item => item.rowId === this.data.rowId) as FormcontrolInterface;
        const layoutIndex : number = fieldData.layout?.findIndex(item => item.columnNumber === this.data.columnId) as number;
        
        if(this.requiredField===false){
            field = {
                'columnNumber':this.data.columnId as number,
                'label':this.label,
                'name':this.nameGenerator.transformString(this.label),
                'value':this.value,
                'radioOptions':this.optionsEntry,
                'placeholder':"",
                'type':'radio'
            }
            this.jsonStorage.setFieldByIndex(field,fieldIndex,layoutIndex);
        }
        else if(this.requiredField===true){
            let validations:ValidatorInterface[]=[{
                validationName:"required",
                message:"This is a required field"
            }];
            field = {
                'columnNumber':this.data.columnId as number,
                'label':this.label,
                'name':this.nameGenerator.transformString(this.label),
                'value':this.value,
                'radioOptions':this.optionsEntry,
                'placeholder':"",
                'type':'radio',
                'validators': validations,
            }
            this.jsonStorage.setFieldByIndex(field,fieldIndex,layoutIndex);
        }
        this.dialogRef.close(1);
    }
}
