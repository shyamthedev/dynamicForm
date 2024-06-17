import { Component, inject } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { IForm } from '../../shared/inferfaces/form.interface';
import { FormComponent } from '../../shared/components/form/form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  configService = inject(ConfigService)
  dynamicForm: any = {}
  load:boolean = false
  ngOnInit() {
   this.getConfig()
  }

  getConfig(){
    this.configService.getRegistrationConfig().subscribe({
      next:(res:IForm)=>{
        this.dynamicForm = res
        this.load = true;
      },
      error:(error)=>{
        console.log(error, 'getConfig()')
      }
     })
  }
}
