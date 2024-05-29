

export interface IAccountingDocumentForm {
    number : string;
    type : number;
    date : string;
    feeDesignation : string;
    feeAmount : number;
    commercialNet : number;
    vat : number;
    netPayable : number;
    customerId : number
}

export interface IAccountingDocument {
    id : number;
    number : string;
    type : number;
    date : string;
    feeDesignation : string;
    feeAmount : number;
    commercialNet : number;
    vat : number;
    netPayable : number;
    customerId : number
}


