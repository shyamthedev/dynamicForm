import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IForm, IFormControl, IValidator } from '../../inferfaces/form.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule , ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  
  @Input() form !:IForm 

  fb = inject(FormBuilder)
  dynamicForm:FormGroup = this.fb.group({})
  load: boolean = false

  ngOnInit(): void {
    if(this.form?.formControls){
      let formGroup:any = {}
      this.form.formControls.forEach((control:IFormControl)=>{
        let formControlValidators:any = []
        if(control.validators){
          control.validators.forEach((val:IValidator)=>{
            if(val.validatorName === 'required'){
              formControlValidators.push(Validators.required)
            }
            if(val.validatorName === 'email'){
              formControlValidators.push(Validators.email)
            }
            if(val.validatorName === 'minlength'){
              formControlValidators.push(Validators.minLength(val.minlength as number))
            }
            if(val.validatorName === 'maxlength'){
              formControlValidators.push(Validators.maxLength(val.maxlength as number))
            }
            if(val.validatorName === 'pattern'){
              formControlValidators.push(Validators.pattern(val.pattern as string))
            }
          })
        }
        formGroup[control.name] = [control.value || '' , formControlValidators]
      })
      this.dynamicForm = this.fb.group(formGroup)
    }
  }

  onReset(){

  }

  onSubmit(){
    console.log(this.dynamicForm.value)
  }

  getValidationErros(control:IFormControl):string{
   let errorMessage = ''
   const myFormControl = this.dynamicForm.get(control.name)
   control.validators?.forEach((val:IValidator)=>{
     if(myFormControl?.hasError(val.validatorName as string)){
      errorMessage = val.message as string
     }
   })
   return errorMessage
  }
  

}
