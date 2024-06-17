import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IForm, IFormControl, IValidator } from '../../inferfaces/form.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  // Service injection
  fb = inject(FormBuilder)

  @Input()  form!:IForm;
  dynamicForm:FormGroup = this.fb.group({})
  

  ngOnInit(): void {
    if(this.form.formControls){
      let formGroup:any = {}
      this.form.formControls.forEach((control:IFormControl)=>{
        let controlValidators:any = []
        if(control.validators){
          control.validators.forEach((validator:IValidator)=>{
            if (validator.validatorName === 'required') controlValidators.push(Validators.required)
            if (validator.validatorName === 'email') controlValidators.push(Validators.email)
            if (validator.validatorName === 'pattern') controlValidators.push(Validators.pattern(validator.pattern as string))
            if (validator.validatorName === 'minlength') controlValidators.push(Validators.minLength(validator.minlength as number))
            if (validator.validatorName === 'maxlength') controlValidators.push(Validators.maxLength(validator.maxlength as number))
          })
        }
        formGroup[control.name] = [control.value || '' , controlValidators]
      })
      this.dynamicForm = this.fb.group(formGroup)
    }
  }

  getValidationError(control:IFormControl):string{
   const myFormControl = this.dynamicForm.get(control.name)
   let errorMessage = '';
   control.validators?.forEach((validator:IValidator)=>{
    if(myFormControl?.hasError(validator.validatorName as string)){
      errorMessage = validator.message
    }
   })
   return errorMessage
  }

  onSubmit(){
    console.log(this.dynamicForm.value)
  }

  onReset(){
    this.dynamicForm.reset()
  }

}
