import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn:'root'})
export class DropzoneManagementService{
  private externalDropzoneEnable = new BehaviorSubject<boolean>(true);
  public observer$ = this.externalDropzoneEnable.asObservable();
  public dropzoneManager(event:boolean):void{
    this.externalDropzoneEnable.next(event);
  }
}
