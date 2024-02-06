import { CommonModule } from "@angular/common";
import { Component, Inject, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { FormcontrolNameGenerator } from "../services/formcontrolnamegenerator.service";
import { FormJsonCreator } from "../services/formjsoncreator.service";
import { FormcontrolInterface } from "../interfaces/formcontrol.interface";
import { ValidatorInterface } from "../interfaces/validator.interface";

@Component({
    standalone:true,
    imports:[CommonModule,MatDialogModule,FormsModule],
    selector:"fb-file-upload-creation-popup",
    templateUrl:"./file-upload-creation.component.html"
})
export class FileuploadCreationPopup{
    private jsonStorage = inject(FormJsonCreator);
    private nameGenerator = inject(FormcontrolNameGenerator);
    public dialogRef = inject(MatDialogRef<FileuploadCreationPopup>);
    constructor(@Inject(MAT_DIALOG_DATA) public data: {class:string}) {}

    label:string="";
    class:string=this.data.class as string;
    requiredField:boolean=false;
    allowedFileTypes:{key:string,value:boolean}[]=[
        {key:"allowImages",value:false},
        {key:"allowPdf",value:false},
        {key:"allowDocs",value:false},
        {key:"allowSpreadsheets",value:false},
    ];
    allowedTypesLabel:string[]=[
        "Images",
        "Pdf",
        "Doc files",
        "Csv/Excel sheets"
    ];
    enableSubmit:boolean=false;

    enableSubmitButton():void{
        if(this.label!==""){
            this.enableSubmit=true;
        }
    }

    onSubmit():void{
        let field: FormcontrolInterface;
        let allowedFiles:string[]=[];
        if(this.allowedFileTypes[0].value===true){
            allowedFiles.push(".jpeg");
            allowedFiles.push(".png");
            allowedFiles.push(".jpg");
        }
        if(this.allowedFileTypes[1].value===true){
            allowedFiles.push(".pdf");
        }
        if(this.allowedFileTypes[2].value===true){
            allowedFiles.push(".doc");
            allowedFiles.push(".docx");
        }
        if(this.allowedFileTypes[0].value===true){
            allowedFiles.push(".xlsx");
            allowedFiles.push(".xls");
            allowedFiles.push(".csv");
        }
        if(this.requiredField===false){
            field = {
                'class':this.class,
                'label':this.label,
                'name':this.nameGenerator.transformString(this.label),
                'placeholder':"",
                'acceptedFileTypes':allowedFiles,
                'type':'file'
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
                'validators': validations,
                'placeholder':"",
                'acceptedFileTypes':allowedFiles,
                'type':'file'
            }
            this.jsonStorage.fieldCreator(field);
        }
        this.dialogRef.close(1);
    }
}