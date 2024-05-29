

export interface ICustomerForm {
    number : string;
    name : string;
    address : string;
    postalCode : string;
    city : string;
    telephoneNumber : string | null;
    email : string
}



export interface ICustomer {
    id : number;
    number : string;
    name : string;
    address : string;
    postalCode : string;
    city : string;
    telephoneNumber : string | null;
    email : string
}
