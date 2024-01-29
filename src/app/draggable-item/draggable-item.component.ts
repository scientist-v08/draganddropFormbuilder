import { Component, Input } from "@angular/core";

@Component({
    standalone: true,
    selector:'fb-draggable-item',
    template:`
    <div
        class="draggable-item"
        draggable="true"
        (dragstart)="dragStart($event)">
        {{label}}
    </div>
    `,
    styles: [`.draggable-item {
        padding: 8%;
        margin: 5% 5% 5% 0%;
        border: 1px solid #ccc;
        cursor: move;
    }`]
})
export class DraggableItemComponent{
    @Input() label:string="";
    @Input() type:string="";
    dragStart(event:DragEvent):void{
        event.dataTransfer?.setData("text/plain", JSON.stringify({label: this.label}));
    }
}