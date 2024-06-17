import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { IForm } from "../shared/inferfaces/form.interface";

@Injectable({
    providedIn:'root'
})
export class ConfigService {

    http = inject(HttpClient);

    getLoginConfig(){
        return this.http.get<IForm>('assets/login-config.json')
    }

    getRegistrationConfig(){
        return this.http.get<IForm>('assets/register-config.json')
    }
}