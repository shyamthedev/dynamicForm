import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { IForm } from "../shared/inferfaces/form.interface";

@Injectable({
    providedIn:'root'
})
export class ConfigService {

    http = inject(HttpClient);

    getConfig(){
        return this.http.get<IForm>('assets/config.json')
    }
}