import { CommonModule } from "@angular/common";
import { Component, Inject, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { FormJsonCreator } from "../services/formjsoncreator.service";
import { ValidatorInterface } from "../interfaces/validator.interface";
import { FormcontrolNameGenerator } from "../services/formcontrolnamegenerator.service";
import { FormcontrolInterface } from "../interfaces/formcontrol.interface";

@Component({
    standalone:true,
    imports:[CommonModule,MatDialogModule,FormsModule],
    selector:'fb-textarea-popup',
    templateUrl:'./textarea-popup.component.html'
})
export class TextareaPopupComponent{
    private jsonStorage = inject(FormJsonCreator);
    private nameGenerator = inject(FormcontrolNameGenerator);
    public dialogRef = inject(MatDialogRef<TextareaPopupComponent>);
    constructor(@Inject(MAT_DIALOG_DATA) public data: {class:string,rowId?:number,columnId?:number}) {}

    label:string="";
    value:string="";
    placeholder:string="";
    class:string=this.data.class as string;
    ValidationAdd:string="No";
    showNumOfVals:boolean=false;
    numberOfValidation:number=0;
    validators:ValidatorInterface[]=[];
    validatorSelector:boolean=false;
	  enableSubmit:boolean=false;

    checkToAddValidation():void{
        if(this.ValidationAdd==='Yes'){
            this.showNumOfVals=true;
        }
        else if(this.ValidationAdd==='No'){
            this.showNumOfVals=false;
            this.numberOfValidation=0;
            this.validators=[];
            this.validatorSelector=false;
        }
    }

    addEntries():void{
        this.validators=[];
        for(let i=0;i<this.numberOfValidation;i++){
            this.validators.push({ validationName:'', message:"", maxLength:0, minLength:0, pattern:"" });
        }
        this.validatorSelector=true;
    }

    onSubmit():void{
        let field: FormcontrolInterface;
        if(this.validatorSelector===false){
            field = {
                'class':this.class,
                'label':this.label,
                'name':this.nameGenerator.transformString(this.label),
                'value':this.value,
                'placeholder':this.placeholder,
                'type':'textarea'
            }
            this.jsonStorage.fieldCreator(field);
        }
        else if(this.validatorSelector===true){
            let validations:ValidatorInterface[]=[];
            for(let i=0;i<this.numberOfValidation;i++){
                if(this.validators[i].validationName==='required'){
                    validations.push({
                        validationName:this.validators[i].validationName,
                        message:"This is a required field"
                    });
                }
                else if(this.validators[i].validationName==='maxlength'){
                    const messageString : string = "Please enter less than "+this.validators[i].maxLength as string + " characters";
                    validations.push({
                        validationName:this.validators[i].validationName,
                        message:messageString,
                        maxLength:this.validators[i].maxLength
                    });
                }
                else if(this.validators[i].validationName==='minlength'){
                    const messageString : string = "Please enter more than "+this.validators[i].minLength as string + " characters";
                    validations.push({
                        validationName:this.validators[i].validationName,
                        message:messageString,
                        minLength:this.validators[i].minLength
                    });
                }
            }
            field = {
                'class':this.class,
                'label':this.label,
                'name':this.nameGenerator.transformString(this.label),
                'value':this.value,
                'placeholder':this.placeholder,
                'type':'textarea',
                'validators': validations
            }
            this.jsonStorage.fieldCreator(field);
        }
        this.dialogRef.close(1);
    }

    enableSubmitButton():void{
        if(this.label!==""){
            this.enableSubmit=true;
        }
    }
}
