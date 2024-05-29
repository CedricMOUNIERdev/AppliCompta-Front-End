<template>

<a>
<RouterLink to="/menu">MENU</RouterLink>  
</a>

  <p>
    <h1>
      TABLEAU DES CLIENTS
    </h1><br>
  </p>
  
<div>
  <el-table :data="tableDataCustomers" table-layout="auto">

    <el-table-column fixed prop="number" label="Numero" width="130" />
    <el-table-column prop="name" label="Nom" width="150" />
    <el-table-column prop="address" label="Adresse" width="230" />
    <el-table-column prop="postalCode" label="Code Postal" width="120" />
    <el-table-column prop="city" label="Ville" width="150" />
    <el-table-column prop="telephoneNumber" label="Numero de Telephone" class="no-wrap" width="190" />
    <el-table-column prop="email" label="Email" width="230" />

    <el-table-column>
      <template #default="scope">
        <el-button type="warning" @click="edit(scope.row)" >Editer</el-button>
      </template>
    </el-table-column>

    <el-table-column>
      <template #default="scope">
        <el-button type="warning" @click="deleteDataCustomer(scope.row)">Supprimer</el-button>
      </template>
    </el-table-column>


  </el-table>
</div>


</template>

<script setup lang="ts">

import axios from 'axios'
import router from "@/router";
import { ElButton, ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import type { RouterLink } from 'vue-router'
import { onMounted, ref } from "vue";
import CustomersDataService from '@/services/CustomersDataService';
import type { ICustomer } from '@/type/Customer';


const tableDataCustomers = ref<ICustomer[]> ([])

const initCustomersTable = async () => {
  try {
    tableDataCustomers.value = await CustomersDataService.GetCustomers();
    for (let i = 0; i < tableDataCustomers.value.length; i++) {
      console.log(tableDataCustomers.value[i]);
    }
  } catch (error) {
    console.error('Une erreur s\'est produite :', error);
  }
}

async function edit(row: any) {
router.push({ name: 'EditCustomer', params: { id: row.id } })
}

const deleteDataCustomer = async (row: any) => {

  try {
    await ElMessageBox.confirm(
      `Attention !
      Etes-vous sûr de vouloir supprimer le client n° ${row.number} ?
      Tous les documents comptables qui concernent le client n° ${row.number} seront également supprimés !
      `,
        { confirmButtonText: 'OK',
          cancelButtonText: 'Annuler',
          type: 'warning',
        }
    );    
    ElMessage({
        type:'success',
        message: 'Le client a bien été supprimé. ',
    })
  
    await CustomersDataService.DeleteCustomer(row.id);
    initCustomersTable()  

  }

  catch(error) {
    ElMessage({
      type: 'info',
      message: 'Suppression du client annulé',
    })
  }
}
    

onMounted (() => {
  initCustomersTable();
})


</script>

<style scoped>

h1 {
  text-align: center;
}





</style>

