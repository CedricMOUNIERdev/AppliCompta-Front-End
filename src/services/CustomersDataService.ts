import {apiService, setToken} from "@/ApiService";
import type { ICustomer, ICustomerForm } from "@/type/Customer";


export default {

    async GetCustomers(): Promise<ICustomer[]>{

        const response = await apiService.get(`/customers`);
        setToken(localStorage.getItem('token'));
        return response.data;
    },

    async GetCustomerById(id : number) : Promise<ICustomer>{
        
        const response = await apiService.get<ICustomer>(`/customers/${id}`)
        setToken(localStorage.getItem('token'));
        return response.data;
    },

    PostCustomer(data : ICustomerForm) : Promise<ICustomer>{

        setToken(localStorage.getItem('token'));
        return apiService.post(`/customers`, data)
    },

    PutCustomer(data : ICustomerForm, id : number) : Promise<ICustomer>{

        setToken(localStorage.getItem('token'));
        return apiService.put(`/customers/${id}`, {...data, id})
    },

    DeleteCustomer(id : number) : Promise<void> {

        setToken(localStorage.getItem('token'));
        return apiService.delete(`/customers/${id}`)
    },

    
    
}