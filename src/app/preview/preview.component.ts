import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormcontrolInterface } from "../interfaces/formcontrol.interface";
import { ValidatorInterface } from "../interfaces/validator.interface";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { FormJsonCreator } from "../services/formjsoncreator.service";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";

@Component({
    standalone:true,
    imports:[CommonModule,ReactiveFormsModule,MatDialogModule],
    selector:'fb-preview',
    templateUrl:'./preview.component.html'
})
export class Preview{
    fb = inject(FormBuilder);
	  formJson = inject(FormJsonCreator);
    public dialogRef = inject(MatDialogRef<Preview>);
    form : FormcontrolInterface[];
	  constructor() {
		    this.form = this.formJson.getAllFields();
	  }
    dynamicForm : FormGroup = this.fb.group({},{updateOn:'submit'});
    public ngOnInit():void{
        let formGroup: any = {};
        this.form.forEach((control:FormcontrolInterface)=>{
            let controlValidators: any = []
            if(control.validators){
            control.validators.forEach((val:ValidatorInterface)=>{
                if(val.validationName==='required') controlValidators.push(Validators.required);
                if(val.validationName==='email') controlValidators.push(Validators.email);
                if(val.validationName==='maxlength') controlValidators.push(Validators.maxLength(val.maxLength as number));
                if(val.validationName==='minlength') controlValidators.push(Validators.minLength(val.minLength as number));
                if(val.validationName==='pattern') controlValidators.push(Validators.pattern(val.pattern as string));
            })
            }
            formGroup[control.name] = [control.value ? control.value : '',controlValidators];
        });
        this.dynamicForm=this.fb.group(formGroup);
    }

    onSubmit():void{
        console.log(this.dynamicForm.getRawValue());
        this.dialogRef.close();
    }

    onReset():void{
        this.dynamicForm.reset();
    }

    getValidationError(control:FormcontrolInterface):string{
        const myFormControl = this.dynamicForm.get(control.name);
        let errorMessage:string=''
        control.validators?.forEach((val)=>{
        if(myFormControl?.hasError(val.validationName as string)){
        errorMessage=val.message as string;
        }
        });
        return errorMessage;
    }
}
