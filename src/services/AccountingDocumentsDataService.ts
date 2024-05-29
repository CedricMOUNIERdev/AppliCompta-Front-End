import  {apiService, setToken}  from "@/ApiService";
import type { IAccountingDocument, IAccountingDocumentForm } from "@/type/AccountingDocument";
import type { IPagedResponse } from "@/type/PagedResponse";



export default {

    async GetAccountingDocuments(choiceType: number | "", currentPage: number, sizePage: number): Promise<IPagedResponse<IAccountingDocument>>{
        setToken(localStorage.getItem('token'));
        const response = await apiService.get(`/accountingDocuments?pageNumber=${currentPage}&pageSize=${sizePage}&type=${choiceType}`)
           
        return response.data;
    },

    async GetAccountingDocumentExportExcel(choiceType: number | ""): Promise<Blob>{
        setToken(localStorage.getItem('token'));
        const response = await apiService.get(`/accountingDocuments/xls?type=${choiceType}`, {
           responseType: 'blob',  
        })
        return response.data;
    },

    async GetAccountingDocumentById(id : number) : Promise<IAccountingDocument>{
        setToken(localStorage.getItem('token'));
        const response = await apiService.get<IAccountingDocument>(`/accountingDocuments/${id}`)
        return response.data;
    },

    PostAccountingDocument(data : IAccountingDocumentForm) : Promise<IAccountingDocument>{
        setToken(localStorage.getItem('token'));
        return apiService.post(`/accountingDocuments`, data)
    },

    PutAccountingDocument(data : IAccountingDocumentForm, id : number) : Promise<IAccountingDocument>{
        setToken(localStorage.getItem('token'));
        return apiService.put(`/accountingDocuments/${id}`, {...data, id})
    },

    DeleteAccountingDocument(id : number) : Promise<void> {
        setToken(localStorage.getItem('token'));
        return apiService.delete(`/accountingDocuments/${id}`)
    },

    
    
}