export interface IForm {
    formTitle: string
    saveBtnTitle: string
    resetBtnTitle: string
    formControls: IFormControl[]
  }
  
  export interface IFormControl {
    type: string
    name: string
    label:string
    placeholder?: string
    value?: string
    class?: string
    options?:IOptions[]
    radioOptions?:string[]
    validators?: IValidator[]
  }
  
  export interface IValidator {
    validatorName: string
    message: string
    required?: boolean
    email?: string
    pattern?:string
    maxlength?:number
    minlength?:number
  }

  export interface IOptions {
    id?:string
    value?:string
  }