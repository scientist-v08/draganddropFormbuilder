import { Injectable } from "@angular/core";
import { FormcontrolInterface } from "../interfaces/formcontrol.interface";
import { LayoutFormcontrolInterface } from "../interfaces/layoutformcontrol.interface";

@Injectable()
export class FormJsonCreator{
    private droppedItem:FormcontrolInterface[] = [];
    public fieldCreator(data:FormcontrolInterface):void{
        this.droppedItem.push(data);
    }
    public getAllFields():FormcontrolInterface[]{
        return this.droppedItem;
    }
    public setFieldByIndex(data:LayoutFormcontrolInterface,fieldIndex:number,layoutIndex:number):void{
        let field = this.droppedItem[fieldIndex].layout;
        if(field !== undefined){
            field[layoutIndex]=data;
        }
        this.droppedItem[fieldIndex].layout = field;
    }
}
