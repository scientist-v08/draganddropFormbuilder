import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn:'root'})
export class DropzoneManagementService{
  private externalDropzoneEnable : boolean =true;
  public setExternalDropzoneEnable(event:boolean):void{
    this.externalDropzoneEnable=event;
  }
  public getExternalDropzoneEnable():boolean{
    return this.externalDropzoneEnable;
  }
}
