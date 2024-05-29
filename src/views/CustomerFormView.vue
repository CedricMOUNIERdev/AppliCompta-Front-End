<template>

<a>
<RouterLink to="/menu">MENU</RouterLink>  
</a><br>

  <p>
    <h1>
      FORMULAIRE CLIENT
    </h1><br>

  </p>

  <el-form
    :inline="true"
    :model="customerForm"
    label-width="250px"
    @submit.prevent="save">

    <el-row :gutter="10">
    
      <el-col :sm="12">
        <el-form-item label="Numéro Client" prop="number">
          <el-input v-model="customerForm.number" placeholder="Numéro Client"/>
        </el-form-item>
      </el-col>  

      <el-col :sm="12">
        <el-form-item label="Nom Client" prop="name">
          <el-input v-model="customerForm.name" placeholder="Nom Client"/>
        </el-form-item>
      </el-col>

    </el-row>  

    <el-row :gutter="10">  
      <el-col :sm="12">
        <el-form-item label="Adresse Client" prop="address">
          <el-input v-model="customerForm.address" placeholder="Adresse Client"/>
        </el-form-item>
      </el-col>

      <el-col :sm="12">
        <el-form-item label="Code Postal" prop="postalCode">
          <el-input v-model="customerForm.postalCode" placeholder="Code Postal"/>
        </el-form-item>
      </el-col>
    </el-row> 

    <el-row :gutter="10">

      <el-col :sm="12">
        <el-form-item label="Ville" prop="city">
          <el-input v-model="customerForm.city" placeholder="City"/>
        </el-form-item>
      </el-col>
    </el-row>
      
    <el-row :gutter="10">  
      <el-col :sm="12">
        <el-form-item label="Numéro de Telephone" prop="telephoneNumber">
          <el-input v-model="customerForm.telephoneNumber" placeholder="Numéro de Telephone"/>
        </el-form-item>
      </el-col>  

      <el-col :sm="12">
        <el-form-item label="Email" prop="email">
          <el-input v-model="customerForm.email" placeholder="Email"/>
         </el-form-item>
      </el-col>
    </el-row>  


    <el-button-group>
      <el-button type="warning" native-type="submit">Valider</el-button>
    </el-button-group>

  </el-form>
  

</template>

<script setup lang="ts">

import router from '@/router';
import { onMounted, ref } from 'vue';
import {ElForm, ElButton } from 'element-plus'
import { RouterLink } from 'vue-router'
import 'element-plus/es/components/message/style/css'
import CustomersDataService from '@/services/CustomersDataService'
import type { ICustomerForm } from '@/type/Customer';



const props = defineProps({
  id: Number
})




const save = async (row:any) => {
    await saveCustomers();
    router.push({name :'CustomersTable'})
}

onMounted (() => {
  
    fillCustomerForm();
  
})

const fillCustomerForm = async () => { console.log(props.id)
  if (props.id)
  {
    let customer = await CustomersDataService.GetCustomerById(props.id);
      customerForm.value.number = customer.number;
      customerForm.value.name = customer.name;
      customerForm.value.address = customer.address;
      customerForm.value.postalCode = customer.postalCode;
      customerForm.value.city = customer.city;
      customerForm.value.telephoneNumber = customer.telephoneNumber;
      customerForm.value.email = customer.email;
       
  }
}

const customerForm = ref<ICustomerForm> ({
        number: '',
        name: '',
        address: '',
        postalCode: '35000',
        city: 'RENNES',
        telephoneNumber: '',
        email: ''
})



const saveCustomers = async () => {
  if (props.id)
  {
    await CustomersDataService.PutCustomer(customerForm.value, props.id);
  }
  else
  {
    await CustomersDataService.PostCustomer(customerForm.value)
  }
}

</script>

<style scoped>



.el-form {
  place-items: center;
  
}

.el-button-group {
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  text-align: center;
}

label {
  text-align: left;
}

input {
  width: 400px;
}


</style>