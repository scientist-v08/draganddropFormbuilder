import { CheckboxOptionsInterface } from "./checkbox.interface";
import { OptionsInterface } from "./options.interface";
import { ValidatorInterface } from "./validator.interface";

export interface FormcontrolInterface {
    name: string
    label: string
    value?: string
    placeholder: string
    class: string
    type: string
    options?: OptionsInterface[]
    radioOptions?:string[]
    checkboxOptions?:CheckboxOptionsInterface[]
    validators?: ValidatorInterface[]
}
