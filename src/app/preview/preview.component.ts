import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormcontrolInterface } from "../interfaces/formcontrol.interface";
import { ValidatorInterface } from "../interfaces/validator.interface";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { FormJsonCreator } from "../services/formjsoncreator.service";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { CheckboxOptionsInterface } from "../interfaces/checkbox.interface";

@Component({
    standalone:true,
    imports:[CommonModule,ReactiveFormsModule,MatDialogModule,MatIconModule],
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
            let controlValidators: any = [];
            if(control.validators){
                control.validators.forEach((val:ValidatorInterface)=>{
                    if(val.validationName==='required') controlValidators.push(Validators.required);
                    if(val.validationName==='email') controlValidators.push(Validators.email);
                    if(val.validationName==='maxlength') controlValidators.push(Validators.maxLength(val.maxLength as number));
                    if(val.validationName==='minlength') controlValidators.push(Validators.minLength(val.minLength as number));
                    if(val.validationName==='pattern') controlValidators.push(Validators.pattern(val.pattern as string));
                })
            }
            if(control.type !== 'checkbox' && control.type !== 'layout')formGroup[control.name] = new FormControl(control.value ? control.value : '',controlValidators);
            else if(control.type === 'checkbox'){
                formGroup[control.name] = this.createCheckboxForm(control.checkboxOptions as CheckboxOptionsInterface[]);
            }
            else if(control.type === 'layout'){
                let layoutControlValidator: any = [];
                if(control.layout?.validators){
                    control.layout?.validators.forEach((val:ValidatorInterface)=>{
                        if(val.validationName==='required') layoutControlValidator.push(Validators.required);
                        if(val.validationName==='email') layoutControlValidator.push(Validators.email);
                        if(val.validationName==='maxlength') layoutControlValidator.push(Validators.maxLength(val.maxLength as number));
                        if(val.validationName==='minlength') layoutControlValidator.push(Validators.minLength(val.minLength as number));
                        if(val.validationName==='pattern') layoutControlValidator.push(Validators.pattern(val.pattern as string));
                    });
                }
                if(control.layout?.type !== 'checkbox')formGroup[control.name] = new FormControl(control.value ? control.value : '',layoutControlValidator);
                else if(control.layout?.type === 'checkbox'){
                    formGroup[control.name] = this.createCheckboxForm(control.checkboxOptions as CheckboxOptionsInterface[]);
                }
            }
        });
        this.dynamicForm=this.fb.group(formGroup);
    }

    private createCheckboxForm(options:CheckboxOptionsInterface[]) {
        const group : any = {};
        options.forEach(option=>{
            group[option.value] = new FormControl(false);
        });
        return this.fb.group(group);
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
