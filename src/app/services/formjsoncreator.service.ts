import { Injectable } from "@angular/core";
import { FormcontrolInterface } from "../interfaces/formcontrol.interface";

@Injectable()
export class FormJsonCreator{
    private droppedItem:FormcontrolInterface[]=[];
    public fieldCreator(data:FormcontrolInterface):void{
        this.droppedItem.push(data);
    }
    public getAllFields():FormcontrolInterface[]{
        return this.droppedItem;
    }
}