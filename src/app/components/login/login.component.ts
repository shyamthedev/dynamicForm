import { Component, OnInit, inject } from '@angular/core';
import { FormComponent } from '../../shared/components/form/form.component';
import { ConfigService } from '../../services/config.service';
import { IForm } from '../../shared/inferfaces/form.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit{
  
  configService = inject(ConfigService)
  dynamicForm: any = {}
  load:boolean = false
  ngOnInit() {
   this.getConfig()
  }

  getConfig(){
    this.configService.getConfig().subscribe({
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
