import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";

@Component({
	standalone:true,
	imports:[CommonModule,ReactiveFormsModule,MatDialogModule],
    selector:"fb-layout-creation-popup",
	templateUrl:"./layout-creation-popup.component.html"
})
export class LayoutCreationPopupComponent{
	public dialogRef = inject(MatDialogRef<LayoutCreationPopupComponent>);
	layoutForm = new FormGroup({
		'size':new FormControl(null,[Validators.required]),
		'columnSize':new FormControl(null,[Validators.required]),
		'numberOfFields':new FormControl(null,[Validators.required])
	});
	sizeList = [
		{name: 'xs', id: 'xs'},
		{name: 'sm', id: 'sm'},
		{name: 'md', id: 'md'},
		{name: 'lg', id: 'lg'},
		{name: 'xl', id: 'xl'},
	];
	columnSizes:number[]=[1,2,3,4,5,6,7,8,9,10,11,12];

    onSave():void{
        this.dialogRef.close(this.layoutForm.value);
    }
}
