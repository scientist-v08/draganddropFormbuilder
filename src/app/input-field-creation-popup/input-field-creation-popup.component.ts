import { CommonModule } from "@angular/common";
import { Component, Inject, inject } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormJsonCreator } from "../services/formjsoncreator.service";
import { FormcontrolInterface } from "../interfaces/formcontrol.interface";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { ValidatorInterface } from "../interfaces/validator.interface";

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
    public ValidationAdd:string="No";
    public showNumOfVals:boolean=false;
    public numberOfValidation:number=0;
    public validators:ValidatorInterface[]=[];
    public validatorSelector:boolean=false;

    onSubmit():void{
        let field: FormcontrolInterface;
        if(this.validatorSelector===false){
            field = {
                'class':this.class,
                'label':this.label,
                'name':this.name,
                'value':this.value,
                'placeholder':this.placeholder,
                'type':this.type
            }
            this.jsonStorage.fieldCreator(field);
        }
        else if(this.validatorSelector===true){
            let validations:ValidatorInterface[]=[];
            for(let i=0;i<this.numberOfValidation;i++){
                if(this.validators[i].validationName==='required' || this.validators[i].validationName==='email'){
                    validations.push({
                        validationName:this.validators[i].validationName,
                        message:this.validators[i].message
                    });
                }
                else if(this.validators[i].validationName==='maxlength'){
                    validations.push({
                        validationName:this.validators[i].validationName,
                        message:this.validators[i].message,
                        maxLength:this.validators[i].maxLength
                    });
                }
                else if(this.validators[i].validationName==='minlength'){
                    validations.push({
                        validationName:this.validators[i].validationName,
                        message:this.validators[i].message,
                        minLength:this.validators[i].minLength
                    });
                }
                else if(this.validators[i].validationName==='pattern'){
                    validations.push({
                        validationName:this.validators[i].validationName,
                        message:this.validators[i].message,
                        pattern:this.validators[i].pattern
                    });
                }
            }
            field = {
                'class':this.class,
                'label':this.label,
                'name':this.name,
                'value':this.value,
                'placeholder':this.placeholder,
                'type':this.type,
                'validators': validations
            }
            console.log(field);
            this.jsonStorage.fieldCreator(field);
        }
        this.dialogRef.close(1);
    }

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
            this.validators.push({ validationName:'', message:"", maxLength:-1, minLength:0, pattern:"" });
        }
        this.validatorSelector=true;
    }
}
