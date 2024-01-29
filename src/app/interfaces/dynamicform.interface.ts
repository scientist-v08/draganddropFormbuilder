import { FormcontrolInterface } from "./formcontrol.interface";

export interface DynamicFormInterface {
    formTitle: string
    saveBtnTitle: string
    resetBtnTitle: string
    formControls: FormcontrolInterface[]
}