import { CheckboxOptionsInterface } from "./checkbox.interface"
import { OptionsInterface } from "./options.interface"
import { ValidatorInterface } from "./validator.interface"

export interface LayoutFormcontrolInterface {
    name: string
    label: string
    columnNumber: number
    value?: string
    placeholder: string
    type: string
    options?: OptionsInterface[]
    radioOptions?:string[]
    checkboxOptions?:CheckboxOptionsInterface[]
    acceptedFileTypes?:string[]
    validators?: ValidatorInterface[]
}
