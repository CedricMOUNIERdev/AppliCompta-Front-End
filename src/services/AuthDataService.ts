import {apiService} from "@/ApiService";
import type { IRegisterForm, ILoginForm } from "@/type/Authentification";



export default {

    async PostRegisterUser(data : IRegisterForm) : Promise<string>{
        return apiService.post(`/Auth/register`, data)
    },
    
    async PostLoginUser(user : ILoginForm) : Promise<string>{
        const { data } =  await apiService.post(`/Auth/login`, user)
        return data;
    }
    

    
    
}