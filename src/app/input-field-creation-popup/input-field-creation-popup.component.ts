import { CommonModule } from "@angular/common";
import { Component, Inject, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FormJsonCreator } from "../services/formjsoncreator.service";
import { FormcontrolInterface } from "../interfaces/formcontrol.interface";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { ValidatorInterface } from "../interfaces/validator.interface";
import { FormcontrolNameGenerator } from "../services/formcontrolnamegenerator.service";

@Component({
    standalone:true,
    imports:[CommonModule,MatDialogModule,FormsModule],
    selector:"fb-input-feild-popup",
    templateUrl:"./input-field-creation-popup.component.html"
})
export class InputCreationPopupComponent{
    private jsonStorage = inject(FormJsonCreator);
    private nameGenerator = inject(FormcontrolNameGenerator);
    public dialogRef = inject(MatDialogRef<InputCreationPopupComponent>);
    constructor(@Inject(MAT_DIALOG_DATA) public data: {class:string}) {}

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
	public enableSubmit:boolean=false;

    onSubmit():void{
        let field: FormcontrolInterface;
        if(this.validatorSelector===false){
            field = {
                'class':this.class,
                'label':this.label,
                'name':this.nameGenerator.transformString(this.label),
                'value':this.value,
                'placeholder':this.placeholder,
                'type':this.type
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
                else if(this.validators[i].validationName==='email'){
                    validations.push({
                        validationName:this.validators[i].validationName,
                        message:"Please enter a valid email"
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
                'name':this.nameGenerator.transformString(this.label),
                'value':this.value,
                'placeholder':this.placeholder,
                'type':this.type,
                'validators': validations
            }
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
            this.validators.push({ validationName:'', message:"", maxLength:0, minLength:0, pattern:"" });
        }
        this.validatorSelector=true;
    }

	enableSubmitButton():void{
        if(this.label!==""){
            this.enableSubmit=true;
        }
    }
}
