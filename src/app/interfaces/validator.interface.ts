export interface ValidatorInterface {
    validationName?: string
    required?: boolean
    message?: string
    pattern?: string
    minLength?: number
    maxLength?: number
    email?: string
}