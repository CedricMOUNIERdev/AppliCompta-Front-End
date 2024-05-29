import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePageView.vue'
import Menu from '../views/MenuView.vue'
import CustomersTable from '../views/CustomersTableView.vue'
import CustomerForm from '../views/CustomerFormView.vue'
import AccountingDocumentForm from '../views/AccountingDocumentFormView.vue'
import AccountingDocumentsTable from '../views/AccountingDocumentsTableView.vue'
import RegisterForm from '../views/RegisterFormView.vue'
import LoginForm from '../views/LoginFormView.vue'
import Logout from '../views/LogoutView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { name: 'HomePage', path: '/', component: HomePage},
    { name: 'Menu', path: '/menu', component: Menu },
    { name: 'CustomersTable', path: '/customer/table', component: CustomersTable },
    { name: 'CustomerForm', path: '/customer/form', component: CustomerForm },  
    { name : 'EditCustomer', path: '/customer/edit/:id', component: CustomerForm, 
    props: true },
    { name : 'AccountingDocumentForm', path: '/accountingDocument/form', 
    component: AccountingDocumentForm },
    { name : 'AccountingDocumentsTable', path: '/accountingDocument/table', 
    component: AccountingDocumentsTable },
    { name : 'EditAccountingDocument', path: '/accountingDocument/edit/:id', 
    component: AccountingDocumentForm,
     props: true },
    { name: 'RegisterForm', path: '/register/form', component: RegisterForm },
    { name: 'LoginForm', path: '/login/form', component: LoginForm },
    { name: 'Logout', path: '/logout', component: Logout }
  ]
})
 
export default router
