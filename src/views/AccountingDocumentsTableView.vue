<template>
  
  
    <a>
        <RouterLink to="/menu">MENU</RouterLink>  
    </a><br>

    
      <h1>
        TABLEAU DES DOCUMENTS COMPTABLES
      </h1><br>
    

  

  <el-form-item label="Type">
    <el-select  v-model="choiceType" @change="handleChoiceChanged()" class="m-2" placeholder="Select Type" size="large">
      <el-option value="" label="All" />
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </el-form-item>

<div>
  <el-table :data="tableDataAccountingDocuments" table-layout="auto">

    <el-table-column fixed prop="number" label="Numero" width="130" />
    <el-table-column prop="type" label="Type" width="110" >
      <template #default="scope">
        {{ typeToString(scope.row.type) }}
      </template>
    </el-table-column>  

    <el-table-column prop="date" format="DD/MM/YYYY" label="Date" width="160" />
    <el-table-column prop="feeDesignation" label="Désignation Prestation" width="180" />
    <el-table-column prop="feeAmount" label="Montant Prestation" width="160" />
    <el-table-column prop="commercialNet" label="Net Commercial" width="170" />
    <el-table-column prop="vat" label="TVA" width="130" />
    <el-table-column prop="netPayable" label="Net à Payer" width="170" />
    <el-table-column prop="customerId" label="Id Client" width="110" />

    <el-table-column>
      <template #default="scope">
        <el-button type="warning" @click="editAccountingDocument(scope.row)" >Editer</el-button>
      </template>
    </el-table-column>

    <el-table-column>
      <template #default="scope">
        <el-button type="warning" @click="deleteDataAccountingDocument(scope.row)">Supprimer</el-button>
      </template>
    </el-table-column>


  </el-table>

  <el-pagination v-model:current-page="currentPage" v-model:page-size="sizePage" :page-sizes="[10, 20, 30, 40, 50]" layout="total, sizes, prev, pager, next, jumper" :total="totalRecord" @size-change="handleSizeChange" @current-change="handleCurrentChange" />

</div>

<el-button-group>
  <el-button @click="exportExcel" type="warning" >Export to Excel</el-button>
</el-button-group>


</template>

<script setup lang="ts">

import router from "@/router";
import { ElButton, ElPagination, ElMessage, ElMessageBox } from 'element-plus'
import type { RouterLink } from 'vue-router'
import { onMounted, ref } from "vue";
import AccountingDocumentsDataService from '@/services/AccountingDocumentsDataService';
import type { IAccountingDocument } from '@/type/AccountingDocument';
import {apiUrl, apiService} from "@/ApiService";
import moment from 'moment';
import 'moment/dist/locale/fr';
import CustomersDataService from "@/services/CustomersDataService";


const exportExcel = async () => {
  try {
  const blobResponse = await AccountingDocumentsDataService
  .GetAccountingDocumentExportExcel(choiceType.value); 
  

  var link = document.createElement('a');
  var FILE = window.URL.createObjectURL(blobResponse);
  link.href = FILE;
  console.log(FILE)

  link.setAttribute('download', 'SampleData.xlsx');
  document.body.appendChild(link);
  link.click();
  }

  catch (error) {
    console.error(error);
  }
}



const tableDataAccountingDocuments = ref<IAccountingDocument[]> ([])

const typeToString = (type:number) => {
  switch(type)
      {
        case 0: {
          return 'Invoice';
        }
        case 1: {
          return 'Credit';
        }
        default: {
          return '';
        }
      }
}

const currentPage = ref(1)
const sizePage = ref(10)
const totalRecord = ref(0)

let choiceType = ref<number | "" >("");




const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  initAccountingDocumentsTable()
}

const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  initAccountingDocumentsTable()
}

const initAccountingDocumentsTable = async () => {
  try {
    const pagedResponse = await AccountingDocumentsDataService.GetAccountingDocuments(choiceType.value, currentPage.value, sizePage.value);
    totalRecord.value = pagedResponse.totalRecords;
    tableDataAccountingDocuments.value = pagedResponse.data;

    for (let i = 0; i < tableDataAccountingDocuments.value.length; i++) {
      tableDataAccountingDocuments.value[i].date = moment(tableDataAccountingDocuments.value[i].date).locale('fr').format('LL');
      console.log(tableDataAccountingDocuments.value[i]);
    }
  } catch (error) {
    console.error('Une erreur s\'est produite :', error);
  }
}

async function edit(row: any) {
router.push({ name: 'EditAccountingDocument', params: { id: row.id } })
}

const deleteDataAccountingDocument = async (row: any) => {

  try {
    await ElMessageBox.confirm(
      `Attention !
      Etes-vous sûr de vouloir supprimer le document n° ${row.number} ?`,
      { confirmButtonText: 'OK',
        cancelButtonText: 'Annuler',
        type: 'warning',
      }
    );
    
    ElMessage({
      type:'success',
      message: 'Le document a bien été supprimé. ',
    })
    await AccountingDocumentsDataService.DeleteAccountingDocument(row.id);
    initAccountingDocumentsTable()
  }

  catch(error) {
    ElMessage({
      type: 'info',
      message: 'Suppression du document annulé',
    })
  }
}


const editAccountingDocument = async (row: any) => {
  router.push({ name: 'EditAccountingDocument', params: { id: row.id} })
}

const options = [
  {
    value: 0,
    label: 'Invoice',
  },
  { value: 1,
    label: 'Credit',
  },
]



const handleChoiceChanged = () => {
  initAccountingDocumentsTable();
  console.log(choiceType.value);
}

onMounted (() => {
  initAccountingDocumentsTable()

})

</script>

<style scoped>

h1 {
  text-align: center;
}

.el-button-group {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
