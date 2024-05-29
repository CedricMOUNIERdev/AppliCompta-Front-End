<template>

<a>
<RouterLink to="/menu">MENU</RouterLink>  
</a>

<div>
  <p>
    <h1>
      FORMULAIRE DOCUMENT COMPTABLE
    </h1><br>

  </p>

  <el-form
    :inline="true"
    :model="accountingDocumentForm"
    label-width="250px"
    
    
    @submit.prevent="save">

    <el-row :gutter="10">

      <el-col  :sm="12" >
        <el-form-item label="Numéro Document Comptable" prop="number">
          <el-input v-model="accountingDocumentForm.number" placeholder="Numéro Document Comptable"/>
        </el-form-item>
      </el-col>  
      <el-col  :sm="12" >
  
        <el-form-item label="Type Document Comptable">
          <el-select v-model="accountingDocumentForm.type" placeholder="Select Type" size="large">
            <el-option value="" label="non défini"/>
            <el-option
              v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
        </el-form-item><br>
      </el-col>

    </el-row>

    <el-row :gutter="10">

      <el-col :sm="12">
        <el-form-item label="Date Document Comptable"  prop="date">
          <el-date-picker
          v-model="accountingDocumentForm.date" format ="DD/MM/YYYY" placeholder="Date Document Comptable"/>
        </el-form-item>
      </el-col>
      <el-col :sm="12">
        <el-form-item label="Id Client" prop="customerId">
          <el-select v-model="accountingDocumentForm.customerId" placeholder="Id Client" size="large" :required="true">
            <el-option value="" />
            <el-option
              v-for="item in customerChoice "
              :key="item.id"
              :label="`${item.id} ${item.number} ${item.name}`"
              :value="item.id">
            </el-option>
          </el-select> 
        </el-form-item>
      </el-col>

    </el-row>

    <el-row :gutter="10">
    
      <el-col :sm="12">
        <el-form-item label="Désignation Prestation" prop="feeDesignation">
          <el-input v-model="accountingDocumentForm.feeDesignation" placeholder="Désignation Prestation"/>
        </el-form-item>
      </el-col>
      <el-col :sm="12">
        <el-form-item label="Montant Prestation" prop="feeAmount">
          <el-input v-model.number="accountingDocumentForm.feeAmount" placeholder="Montant Prestation" @change="handleFeeAmountChange()"/>
        </el-form-item>
      </el-col>

    </el-row>

    <el-row :gutter="10">

      <el-col :sm="12">
        <el-form-item label="Net Commercial" prop="commercialNet" >
          <el-input v-model.number="accountingDocumentForm.commercialNet" placeholder="Net Commercial" disabled />
        </el-form-item>
      </el-col>
      <el-col :sm="12">
        <el-form-item label="TVA" prop="vat" >
          <el-input v-model.number="accountingDocumentForm.vat" placeholder="TVA" disabled/>
        </el-form-item>
      </el-col>

    </el-row>

    <el-row :gutter="10">

      <el-col :sm="12">
        <el-form-item label="Net à Payer" prop="netPayable">
          <el-input v-model.number="accountingDocumentForm.netPayable" disabled />
        </el-form-item>
      </el-col>
      
  </el-row>

  <el-button-group>
      <el-button type="warning" native-type="submit">Valider</el-button>
  </el-button-group>
    

  </el-form>

  
</div>

</template>

<script setup lang="ts">


import router from '@/router';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import type { IAccountingDocumentForm, IAccountingDocument } from '@/type/AccountingDocument';
import AccountingDocumentsDataService from '@/services/AccountingDocumentsDataService';
import CustomersDataService from '@/services/CustomersDataService';
import { ElForm, ElOption, ElSelect, ElButton } from 'element-plus';
import type { ICustomer } from '@/type/Customer';


// calcul automatique du Net Commercial
const handleFeeAmountChange = () => {
console.log(accountingDocumentForm.value.feeAmount);
accountingDocumentForm.value.commercialNet = accountingDocumentForm.value.feeAmount
accountingDocumentForm.value.vat = accountingDocumentForm.value.commercialNet * 0.20
accountingDocumentForm.value.netPayable = accountingDocumentForm.value.commercialNet + accountingDocumentForm.value.vat
}



const props = defineProps({
  id: Number
})

const save = async (row:any) => {
  await saveAccountingDocuments();
  router.push({name :'AccountingDocumentsTable'})
}


const options = [
  {
    value: 0,
    label: 'Invoice',
  },
  {
    value: 1,
    label: 'Credit',
  },
]

const customerChoice = ref<ICustomer[]>([])

async function getCustomers()  {
  customerChoice.value = await CustomersDataService.GetCustomers();
}

getCustomers()






onMounted (() => {

    fillAccountingDocumentForm();
    
})

const fillAccountingDocumentForm = async () => { console.log(props.id)
  if (props.id)
  {
  let accountingDocument = await AccountingDocumentsDataService.GetAccountingDocumentById(props.id);
      accountingDocumentForm.value.number = accountingDocument.number;
      accountingDocumentForm.value.type = accountingDocument.type;
      accountingDocumentForm.value.date = accountingDocument.date;
      accountingDocumentForm.value.feeDesignation = accountingDocument.feeDesignation;
      accountingDocumentForm.value.feeAmount = accountingDocument.feeAmount;
      accountingDocumentForm.value.commercialNet = accountingDocument.commercialNet;
      accountingDocumentForm.value.vat = accountingDocument.vat;
      accountingDocumentForm.value.netPayable = accountingDocument.netPayable;
      accountingDocumentForm.value.customerId = accountingDocument.customerId;
      
  }
}

const accountingDocumentForm = ref<IAccountingDocumentForm> ({
    number : '',
    type : 0,
    date : '',
    feeDesignation : 'honoraires',
    feeAmount : 0,
    commercialNet : 0,
    vat : 0,
    netPayable : 0,
    customerId : 0
})

const saveAccountingDocuments = async () => {
  if (props.id)
  {
    await AccountingDocumentsDataService.PutAccountingDocument(accountingDocumentForm.value, props.id);
  }
  else
  {
    await AccountingDocumentsDataService.PostAccountingDocument(accountingDocumentForm.value)
  }
}

</script>

<style scoped>



h1 {
  text-align: center;
}


.el-form {
  place-items: center;
  
}

.el-button-group {
  display: flex;
  justify-content: center;
  align-items: center;
}


input {
  width: 400px; /* Ajustez la largeur en fonction de vos besoins */
}


  

  
  











  
   
    
      

    
  
  


</style>